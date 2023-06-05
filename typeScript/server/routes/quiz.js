const express = require("express");
const isLicenseValid = require('../middlleware/isLicenseValid');
const QuizController = require('../controllers/quiz');

const router = express.Router();

router.get("/quiz/:url", QuizController.getOneQuiz); // проверяем валидность токена
router.post("/quiz/:url", QuizController.updateQuiz); // записываем ответ пользователя


router.post("/generate", isLicenseValid, QuizController.generateToken); // гененрируем токены

router.post("/get_data/:id", QuizController.getAllDataCompany); // постраничный вывод всех заполненых отзывов за указанное время (нужно передать текущую страницу и все страницы)


router.get("/quiz_count/:id_company/:startDate/:endDate", QuizController.getQuizsCount); // получаем колличенство отзывов


module.exports = router; 