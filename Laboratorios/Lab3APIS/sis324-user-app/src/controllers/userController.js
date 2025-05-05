const UserService = require('../services/userService');
const userService = new UserService();

exports.getAllUsers = (req, res) => {
  res.json({ success: true, data: userService.getAll() });
};

exports.getUserById = (req, res) => {
  const user = userService.getById(parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
  res.json({ success: true, data: user });
};

exports.createUser = (req, res) => {
  const newUser = userService.create(req.body);
  res.status(201).json({ success: true, data: newUser });
};

exports.updateUser = (req, res) => {
  const updatedUser = userService.update(parseInt(req.params.id), req.body);
  if (!updatedUser) return res.status(404).json({ error: 'Usuario no encontrado' });
  res.json({ success: true, data: updatedUser });
};

exports.deleteUser = (req, res) => {
  const success = userService.delete(parseInt(req.params.id));
  if (!success) return res.status(404).json({ error: 'Usuario no encontrado' });
  res.json({ success: true, message: 'Usuario eliminado' });
};