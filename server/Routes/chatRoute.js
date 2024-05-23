const express = require("express")
const router = express.Router()
const {findChats, createChat, findUserChats} = require("../Controllers/chatController")


router.post("/", createChat)
router.get("/:userId", findUserChats)
router.get("/find/:firstId/:secondId", findChats)

module.exports = router