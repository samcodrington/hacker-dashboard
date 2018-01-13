const Router = require('express').Router;

const ADMIN = 'admin';
const APPLICATIONS = 'applications';
const REVIEW = 'review';
const SETTINGS = 'settings';

module.exports = (ctr) => {
    const adminAPI = Router();

    const { admin, user } = ctr;

    adminAPI.get(`/${ADMIN}/${APPLICATIONS}/${REVIEW}`, async (req, res) => {
        try {
            const { userId } = req.user;
            const { reviewGroup } = await user.getUser(userId);
            const applicationToReview = await admin.getApplicationToReview(reviewGroup);
            return res.status(200).json(applicationToReview);
        } catch (err) {
            return res.status(err.code).json(err);
        }
    });

    adminAPI.post(`/${ADMIN}/${APPLICATIONS}/${REVIEW}/:userId`, async (req, res) => {
        try {
            const { userId } = req.params;
            const { review } = req.body;
            const updatedUser = await admin.submitApplicationReview(userId, review);
            return res.status(201).json({ user: updatedUser });
        } catch (err) {
            return res.status(err.code).json(err);
        }
    });

    adminAPI.get(`/${ADMIN}/${APPLICATIONS}/reviewed`, async (req, res) => {
        try {
            const applicationsWithReviews = await admin.getApplicationsWithReviews();
            return res.status(200).json({ applicationsWithReviews });
        } catch (err) {
            return res.status(err.code).json(err);
        }
    });

    adminAPI.get(`/${ADMIN}/${APPLICATIONS}/reviewers`, async (req, res) => {
        try {
            const reviewers = await admin.getReviewers();
            res.status(200).json({ reviewers });
        } catch (err) {
            return res.status(err.code).json(err);
        }
    });

    adminAPI.put(`/${ADMIN}/${APPLICATIONS}/reviewers`, async (req, res) => {
        try {
            const reviewers = await admin.reassignReviewers();
            res.status(200).json({ reviewers });
        } catch (err) {
            return res.status(err.code).json(err);
        }
    });

    adminAPI.get(`/${ADMIN}/${SETTINGS}`, async (req, res) => {
        try {
            const settings = await admin.getSettings();
            return res.status(200).json({ settings });
        } catch (err) {
            return res.status(err.code).json(err);
        }
    });

    return adminAPI;
};