import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';

class BrainstormController extends GetxController {
  RxString selectedCategory = "".obs;
  final TextEditingController listOf = TextEditingController();
  final TextEditingController context = TextEditingController();
  final TextEditingController examples = TextEditingController();

  final  brainstormIdea = [].obs;

  Future<void> generateBrainstorm() async {
    final data = {
      "category": selectedCategory.value,
      "list_of": listOf.text,
      "context": context.text,
      "examples": examples.text,
    };

    try {
      final response = await Dio().post(
        'https://bursting-pika-equipped.ngrok-free.app/brainstorming/',
        data: data,
      );
      brainstormIdea.add(response.data["ideas"].toString().split(","));
      print(brainstormIdea);
    } catch (e) {
      print("Error: $e");
    }
  }
}
