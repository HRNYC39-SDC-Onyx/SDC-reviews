const models = require("../models");

module.exports = {
  put: async (req, res) => {
    try {
      const { review_id } = req.params;
      await models.helpful.markHelpful(review_id);
      res.status(204).send();
    } catch (err) {
      res
        .status(500)
        .send(
          "An error occurred. If this error persists, contact your instruction team"
        );
    }
  },
};
