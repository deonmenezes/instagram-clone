import React from 'react';
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import {
  doc,
  getDoc,
  getFirestore,
  setDoc,
  serverTimestamp,
  writeBatch  // Added this
} from 'firebase/firestore';
import handleCreateUsernameQueryArray from './handleCreateUsernameQueryArray';
import app from './firbaseConfig';

interface SubmitUser {
  username: string;
  email: string;
  password: string;
  setIsSubmit: React.Dispatch<React.SetStateAction<boolean>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setPasswordFormErrors: React.Dispatch<React.SetStateAction<string>>;
}

async function submitUser({
  username,
  email,
  password,
  setIsSubmit,
  setLoading,
  setPasswordFormErrors,
}: SubmitUser) {
  const auth = getAuth();
  const db = getFirestore(app);

  try {
    // First check if username exists
    const docRef = doc(db, 'userList', username);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setPasswordFormErrors('Username already exists');
      return;
    }

    setLoading(true);

    // Create authentication user
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const userId = userCredential.user.uid;

    // Update profile
    await updateProfile(userCredential.user, {
      displayName: username,
    });

    // Batch write all documents
    const batch = writeBatch(db);

    // Add username to global list
    batch.set(doc(db, 'userList', username), {});

    // Create user post collection
    batch.set(doc(db, `${username}Posts`, 'userPosts'), {
      createdAt: serverTimestamp(),
      postsListArray: [],
    });

    // Create user document
    batch.set(doc(db, 'users', username), {
      userId,
      avatarURL: '',
      chatRoomIds: [],
      messageCount: 0,
      likes: false,
      likedPosts: [],
      username,
      postCount: 0,
      followers: [],
      following: [],
      story: '',
      storyViews: [],
      heartNotifications: [],
      newHeart: false,
      usernameQuery: handleCreateUsernameQueryArray(username),
    });

    // Commit the batch
    await batch.commit();

    setIsSubmit(true);
    setLoading(false);

  } catch (error: any) {
    setLoading(false);
    if (error.code === 'auth/email-already-in-use') {
      setPasswordFormErrors('Email already in use');
    } else {
      setPasswordFormErrors(error.message.slice(22, -2));
    }
    console.error('Error during sign up:', error);
  }
}

interface HandleCreateUser {
  e: any;
  listeners: any[];
  username: string;
  email: string;
  password: string;
  passwordFormErrors: string;
  emailFormErrors: string;
  usernameFormErrors: string;
  setIsSubmit: React.Dispatch<React.SetStateAction<boolean>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setPasswordFormErrors: React.Dispatch<React.SetStateAction<string>>;
}

function handleCreateUser({
  e,
  listeners,
  username,
  email,
  password,
  passwordFormErrors,
  emailFormErrors,
  usernameFormErrors,
  setIsSubmit,
  setLoading,
  setPasswordFormErrors,
}: HandleCreateUser) {
  e.preventDefault();
  if (
    passwordFormErrors === '' &&
    emailFormErrors === '' &&
    usernameFormErrors === ''
  ) {
    listeners.forEach((unsubscribe: any) => unsubscribe());
    submitUser({
      username,
      email,
      password,
      setIsSubmit,
      setLoading,
      setPasswordFormErrors,
    });
  }
}

export default handleCreateUser;
