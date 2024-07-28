const Issue = require('../models/Issue');

exports.reportIssue = async (req, res) => {
    try {
        const { busNumber, issueDescription } = req.body;
        console.log('Received issue report for bus number:', busNumber);
        console.log('Issue description:', issueDescription);

        const issue = new Issue({ driverId: req.user._id, busNumber, issueDescription });
        await issue.save();

        console.log('Issue saved successfully:', issue);
        res.send(issue);
    } catch (error) {
        console.error('Error saving issue:', error);
        res.status(500).send({ error: 'Server error' });
    }
};


exports.getIssues = async (req, res) => {
  try {
    const issues = await Issue.find({ driverId: req.user._id });
    res.send(issues);
  } catch (error) {
    res.status(500).send({ error: 'Server error' });
  }
};

exports.resolveIssue = async (req, res) => {
  try {
    const { issueId } = req.body;
    const issue = await Issue.findOneAndUpdate({ _id: issueId, driverId: req.user._id }, { resolved: true }, { new: true });
    if (!issue) {
      return res.status(404).send({ error: 'Issue not found' });
    }
    res.send(issue);
  } catch (error) {
    res.status(500).send({ error: 'Server error' });
  }
};
