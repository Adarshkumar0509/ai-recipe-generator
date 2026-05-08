import * as UserModel from '../models/User.js';
import { hashPassword, comparePassword } from '../utils/validators.js';

// Get user profile
export const getUserProfile = async (req, res, next) => {
  try {
    const user = await UserModel.getUserById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      id: user.id,
      username: user.username,
      email: user.email,
      dietary_preferences: user.dietary_preferences,
      allergies: user.allergies,
      cuisines_preference: user.cuisines_preference,
      created_at: user.created_at,
    });
  } catch (error) {
    next(error);
  }
};

// Update user preferences
export const updateUserPreferences = async (req, res, next) => {
  try {
    const { dietary_preferences, allergies, cuisines_preference } = req.body;

    const user = await UserModel.updateUserPreferences(req.user.id, {
      dietary_preferences,
      allergies,
      cuisines_preference,
    });

    res.json({
      message: 'Preferences updated successfully',
      user: {
        id: user.id,
        dietary_preferences: user.dietary_preferences,
        allergies: user.allergies,
        cuisines_preference: user.cuisines_preference,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Update user password
export const updatePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;

    if (!currentPassword || !newPassword || !confirmPassword) {
      return res.status(400).json({ error: 'All password fields are required' });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ error: 'New passwords do not match' });
    }

    const user = await UserModel.getUserById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isPasswordValid = await comparePassword(currentPassword, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Current password is incorrect' });
    }

    const hashedPassword = await hashPassword(newPassword);
    await UserModel.updateUserPassword(req.user.id, hashedPassword);

    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    next(error);
  }
};

// Delete user account
export const deleteAccount = async (req, res, next) => {
  try {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ error: 'Password required to delete account' });
    }

    const user = await UserModel.getUserById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    await UserModel.deleteUser(req.user.id);

    res.json({ message: 'Account deleted successfully' });
  } catch (error) {
    next(error);
  }
};
