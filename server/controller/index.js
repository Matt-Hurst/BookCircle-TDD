const { init } = require('../model');
const User = require('../model');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.getCurrentUserCtrl = (req, res) => {
  res.send(req.user)
}

exports.getFriendBooksCtrl = async (req, res) => {
  const friendBooks = await User.find({ name: req.params.name }, 'books')
  // console.log(friendBooks[0].books)
  res.send(friendBooks)
}

exports.getFriendsNameCtrl = async (req, res) => {
  const result = await User.findById(req.params.id, 'name')
  res.send(result)
}

exports.loginCtrl = async (req, res) => {
  try {
    const { name, password } = req.body
    const user = await User.findOne({ name })
    const result = await bcrypt.compare(password, user.password)
    if (!result) throw new Error('Invalid username or password!')
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET)
    res.send({ token })
  } catch (error) {
    console.error('ERROR', error)
  }
}

exports.createUserCtrl = async (req, res) => {
  try {
    const { name, password } = req.body
    const existingUser = await User.findOne({ name })
    if (existingUser) throw new Error('Username taken')
    const hashed = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS))
    const newUser = new User({
      name,
      password: hashed,
      books: [],
      friends: [],
      activityLog: [],
      yearlyTarget: 0
    });
    await newUser.save((err) => {
      if (err) return console.log(err);
    });
    const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET)
    res.send({ token })
  } catch (error) {
    console.error('ERROR', error)
  }
};

exports.addBookCrtl = async (req, res) => {
  try {
    const newBook = { ...req.body.book, id: uuidv4() };
    const { _id } = req.user ;
    const options = { new: true };
    const user = await User.findOneAndUpdate({ _id }, {
      $push: {
        books: {
          $each: [newBook],
          $position: 0
        }
      }
    }, options);
    res.status(201).send(user.books)
  } catch (error) {
    console.error('ERROR', error)
  }
}

exports.searchUsersCtrl = async (req, res) => {
  const { name } = req.params
  try {
    result = await User.find(
      {
        name: {
          $regex: name,
          $options: "i"
        }
      }, 'name _id').exec()
    res.send(result)
  } catch (error) {
    console.error('ERROR', error)
  }
}

exports.addFriendCtrl = async (req, res) => {
  try {
    const query = { name: req.body.user };
    const options = { new: true };
    const user = await User.findOneAndUpdate(query, {
      $push: {
        pendingFriends: req.body.friend_id
      }
    }, options);

    await User.findOneAndUpdate({ _id: req.body.friend_id }, {
      $push: {
        activityLog: {
          $each: [{ message: `${req.body.user} wants to add you as a friend.`, type: 'friendRequest', senderId: user._id, createdAt: Date.now() }],
          $position: 0
        }
      }
    }, { new: true })
    res.status(201).send(user)
  } catch (error) {
    console.error('ERROR', error)
  }
}

exports.confirmFriendCtrl = async (req, res) => {
  try {
    const { senderId, createdAt } = req.body;
    const userId = req.user._id;
    const responder = await User.findByIdAndUpdate(userId, {
      $push: { friends: senderId },
      $pull: { activityLog: { createdAt: createdAt } }
    }, { new: true, safe: true });

    await User.findByIdAndUpdate(senderId, {
      $push: {
        friends: userId,
        activityLog: {
          $each: [{ message: `${responder.name} accepted your friend request.`, type: 'resolved', createdAt: Date.now() }],
          $position: 0
        }
      },
      $pull: { pendingFriends: userId }
    }, { new: true })

    res.send({friends: responder.friends, activityLog: responser.activityLog })
  } catch (error) {
    console.error('ERROR', error)
  }
}

exports.rejectFriendRequestCtrl = async (req, res) => {
  try {
    const { createdAt, senderId } = req.body
    const userId = req.user._id
    const responder = await User.findByIdAndUpdate(userId, {
      $pull: { activityLog: { createdAt: createdAt } }
    }, { new: true })
    await User.findByIdAndUpdate(senderId, {
      $push: {
        activityLog: {
          $each: [{ message: `${responder.name} rejected your friend request.`, type: 'resolved', createdAt: Date.now() }],
          $position: 0
        },
      },
      $pull: { pendingFriends: userId }
    }, { new: true })
    res.send(responder.activityLog)
  } catch (error) {
    console.error('ERROR', error)
  }
}

exports.getTargetCtrl = async (req, res) => {
  try {
    const { target } = req.user
    res.send(target)
  } catch (error) {
    console.error('ERROR', error)
  }
}

exports.updateTargetCtrl = async (req, res) => {
  const { target } = req.body
  const { _id } = req.user
  try {
    const updatedUser = await User.findByIdAndUpdate(_id, {
      yearlyTarget: target
    }, { new: true });
    res.status(200)
    res.send(updatedUser.yearlyTarget.toString())
  } catch (error) {
    console.error('ERROR', error)
  }
}

exports.removeActivityLogElementCtrl = async (req, res) => {
  try {
    const { userId, createdAt } = req.body;
    const updatedUser = await User.findByIdAndUpdate(userId, {
      $pull: { activityLog: { createdAt: createdAt } }
    }, { new: true });
    res.send(updatedUser.activityLog)
  } catch (error) {
    console.error('ERROR', error)
  }
}

exports.requestBookCtrl = async (req, res) => {
  const  user = req.user
  const { bookId, friendId } = req.body
  try {
    await User.updateOne({
      _id: friendId, books: { $elemMatch: { id: bookId } }
    },
      { $set: { "books.$.availableToBorrow": false } }
    )

    await User.findByIdAndUpdate(friendId, {
      $push: {
        activityLog: {
          $each: [{ message: `${user.name} wants to borrow ${book.title}.`, book: book.id, title: book.title, type: 'bookRequest', senderId: user._id, createdAt: Date.now() }],
          $position: 0
        },
      },
    });
    res.sendStatus(200)
  } catch (error) {
    console.error('ERROR', error)
  }
}

exports.acceptBookRequestCtrl = async (req, res) => {
  try {
    const { createdAt, userId, senderId, title } = req.body

    const user = await User.findByIdAndUpdate(userId, {
      $pull: { activityLog: { createdAt: createdAt } }
    }, { new: true })

    await User.findByIdAndUpdate(senderId, {
      $push: {
        activityLog: {
          $each: [{ message: `${user.name} accepted your request to borrow ${title}, get in touch now to organise collection!`, type: 'resolved', createdAt: Date.now() }],
          $position: 0
        },
      },
    })

    res.send(user.activityLog)
  } catch (error) {
    console.error('ERROR', error)
  }
}

exports.rejectBookRequestCtrl = async (req, res) => {
  try {
    const { createdAt, userId, senderId, book, title } = req.body

    await User.updateOne({
      _id: userId, books: { $elemMatch: { id: book } }
    },
      { $set: { "books.$.availableToBorrow": true } }
    )
    const user = await User.findByIdAndUpdate(userId, {
      $pull: { activityLog: { createdAt: createdAt } }
    }, { new: true })


    await User.findByIdAndUpdate(senderId, {
      $push: {
        activityLog: {
          $each: [{ message: `${user.name} rejected your request to borrow ${title}.`, type: 'resolved', createdAt: Date.now() }],
          $position: 0
        },
      },
    })
    res.send(user.activityLog)
  } catch (error) {
    console.error('ERROR', error)
  }
}

exports.getAvailableBooksCtrl = async (req, res) => {
  try {
    const user = req.user
    const result = []

    for (let i = 0; i < user.friends.length; i++) {
      const friend = await User.findById(user.friends[i])
      friend.books.forEach(book => {
        if (book.availableToBorrow) {
          result.push(
            {
              friendName: friend.name,
              friendId: friend._id,
              ...book
            })
        }
      })
    }
    res.send(result)
  } catch (error) {
    console.error('ERROR', error)
  }
}

exports.editBookCtrl = async (req, res) => {
  try {
    const { bookId, newBook } = req.body
    const updatedBook = {...newBook, id: uuidv4()}
    const userId = req.user._id
    await User.findByIdAndUpdate(userId, {
      $pull: { books: { id: bookId } }
    });
    const result = await User.findByIdAndUpdate(userId, {
      $push: { 
        books: {
          $each: [updatedBook],
          $position: 0 
        }
      }
    }, { new: true })
    res.send(result.books)
  } catch (error) {
    console.error('ERROR', error)
  }
}

exports.deleteBookCtrl = async (req, res) => {
  try {
    const { userId, bookId } = req.body
    const result = await User.findByIdAndUpdate(userId, {
      $pull: { books: { id: bookId } }
    }, { new: true })
    res.send(result)
  } catch (error) {
    console.error('ERROR', error)
  }
}