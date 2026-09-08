import mongoose, { mongo } from 'mongoose';
const conversationSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['private', 'group', 'ai'],
    required: [true, "Type of the conversation is required"]
  },
  participants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true
    }
  ],
  participantsKey: {
    type: String,
    unique: true,
    sparse: true,
  },
  lastMessage: {
    text: {
      type: String
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users'
    },
    timeStamp: {
      type: Date
    }
  },
  groupName: {
    type: String,
    trim: true
  },
  groupAvatar: {
    type: String
  },
  groupAdmins: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users'
    }
  ],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  unreadCount: {
    type: Map,
    of: Number,
    default: {},
  },
}, {
  timestamps: true
})

conversationSchema.index({ participants: 1, updatedAt: -1 });

conversationSchema.index(
  { participantsKey: 1 },
  { unique: true, sparse: true }
);

const conversationModel = mongoose.model('conversations', conversationSchema);
export default conversationModel;