export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  isOnline: boolean;
  lastSeen: Date;
  joinedRooms: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Room {
  _id: string;
  name: string;
  description: string;
  subject: string;
  capacity: number;
  isPrivate: boolean;
  password?: string;
  creator: User;
  members: {
    user: User;
    joinedAt: Date;
    role: 'admin' | 'moderator' | 'member';
  }[];
  tags: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Session {
  _id: string;
  title: string;
  description: string;
  room: Room;
  host: User;
  startTime: Date;
  endTime: Date;
  isRecurring: boolean;
  recurrencePattern?: 'daily' | 'weekly' | 'monthly';
  attendees: {
    user: User;
    status: 'attending' | 'not-attending' | 'maybe';
    joinedAt?: Date;
    leftAt?: Date;
  }[];
  status: 'scheduled' | 'ongoing' | 'completed' | 'cancelled';
  meetingLink?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Note {
  _id: string;
  title: string;
  content: string;
  subject: string;
  author: User;
  room?: Room;
  fileUrl?: string;
  fileType?: 'pdf' | 'doc' | 'docx' | 'txt' | 'image' | 'video' | 'other';
  tags: string[];
  isPublic: boolean;
  sharedWith: {
    user: User;
    permission: 'read' | 'write';
  }[];
  likes: User[];
  downloads: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Message {
  _id: string;
  content: string;
  sender: User;
  room: Room;
  messageType: 'text' | 'file' | 'image' | 'system';
  fileUrl?: string;
  fileName?: string;
  fileSize?: number;
  isEdited: boolean;
  editedAt?: Date;
  replyTo?: Message;
  reactions: {
    user: User;
    emoji: string;
  }[];
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Notification {
  _id: string;
  recipient: User;
  sender?: User;
  type: 'room_invitation' | 'session_reminder' | 'new_message' | 'note_shared' | 'session_started' | 'session_ended';
  title: string;
  message: string;
  data: {
    roomId?: string;
    sessionId?: string;
    noteId?: string;
  };
  isRead: boolean;
  readAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}