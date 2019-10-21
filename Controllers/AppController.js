

exports.authenticate = async (req, res) => {
  try {
    res.status(200).json({ status: 'Success', message:  'authenticated' })
  } catch (error) {
    res.json({message: error})
  }
};