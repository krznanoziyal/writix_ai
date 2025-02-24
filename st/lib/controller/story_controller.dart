import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:flutter_tts/flutter_tts.dart';
import 'package:get/get.dart';

class StoryController extends GetxController {
  final TextEditingController storyController = TextEditingController();
  final firstChapterCreated = true.obs;
  final stories = [].obs;
  final chapters = [].obs;
  final currentChapter = "".obs;

  final FlutterTts flutterTts = FlutterTts(); // Initialized once
  var isSpeaking = false.obs; // To track TTS state

  final data = {
    "plot_point":
        "The hero discovers a hidden power that could save the kingdom but at a great personal cost.",
    "previous_chapters":
        "The hero narrowly escaped an ambush set by the villain, who seeks to conquer the kingdom. Allies were lost, and the hero is struggling with guilt and doubt.",
    "character_data":
        "The hero is a young warrior named Arin, driven by a sense of duty but haunted by past failures. The villain, Lord Malakar, is a cunning sorcerer seeking ultimate power. Arin's mentor, Elyon, is wise but gravely injured.",
    "worldbuilding_data":
        "The story is set in the kingdom of Eldoria, a land of magic and ancient legends. A forbidden forest guards secrets of the past, and the kingdom is divided by political tension.",
    "user_genre": "Fantasy",
    "user_style":
        "Epic and emotional, with a focus on character development and dramatic conflicts."
  };

  @override
  void onInit() {
    super.onInit();
    _initTTS();
  }

  void _initTTS() async {
    await flutterTts.setLanguage("en-US");
    await flutterTts.setPitch(1.0);
    await flutterTts.setSpeechRate(0.5);

    flutterTts.setStartHandler(() {
      isSpeaking.value = true;
    });

    flutterTts.setCompletionHandler(() {
      isSpeaking.value = false;
    });

    flutterTts.setErrorHandler((msg) {
      print("TTS Error: $msg");
      isSpeaking.value = false;
    });
  }

  void changeChapter(String chapter) {
    currentChapter.value = chapter;
  }

  Future<void> startSpeaking() async {
    if (currentChapter.value.isEmpty) {
      return;
    }
    await flutterTts.speak(currentChapter.value);
  }

  Future<void> stopSpeaking() async {
    await flutterTts.stop();
    isSpeaking.value = false;
  }

  Future<void> createChapter() async {
    storyController.clear();
    try {
      final response = await Dio().post(
        'https://bursting-pika-equipped.ngrok-free.app/chapter/',
        data: data,
      );
      currentChapter.value =
          response.data["chapter_text"] ?? response.data["details"];
      chapters.add(response.data);
      firstChapterCreated.value = true;
    } catch (e) {
      print("Error fetching chapter: $e");
    }
  }
}
