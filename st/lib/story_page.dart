import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:st/controller/story_controller.dart';
import 'package:st/profile.dart';
import 'package:st/story_settings.dart';
import 'package:st/theme.dart';

class StoryPage extends StatelessWidget {
  StoryPage({super.key});

  final StoryController storyController = Get.put(StoryController());

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: bgColor,
      body: Container(
        height: double.infinity,
        margin: const EdgeInsets.symmetric(horizontal: 15, vertical: 10)
            .copyWith(top: 50),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          children: [
            Row(
              children: [
                GestureDetector(
                  onTap: () => Get.to(() => Profile(),
                      transition: Transition.rightToLeft),
                  child: Container(
                    height: 40,
                    width: 40,
                    decoration: BoxDecoration(
                      color: const Color(0xFFE7E7E7),
                      borderRadius: BorderRadius.circular(30),
                      image: const DecorationImage(
                        image: AssetImage('assets/author.jpg'),
                      ),
                    ),
                  ),
                ),
                const Spacer(),
                TextButton.icon(
                  style: ButtonStyle(
                    foregroundColor: WidgetStateProperty.all(Colors.black54),
                  ),
                  onPressed: () => Get.to(() => StorySettings(),
                      transition: Transition.rightToLeft),
                  label: const Text(
                    "Story Settings",
                    style: TextStyle(fontWeight: FontWeight.bold),
                  ),
                  icon: const Icon(Icons.settings, color: Colors.black54),
                  iconAlignment: IconAlignment.end,
                ),
              ],
            ),
            const SizedBox(height: 20),
            Expanded(
              child: Obx(() {
                return storyController.chapters.isEmpty
                    ? Center(
                        child: Column(
                          mainAxisSize: MainAxisSize.min,
                          children: [
                            Text(
                              "New Story",
                              style: GoogleFonts.luxuriousRoman(
                                color: const Color.fromARGB(221, 40, 40, 40),
                                fontSize: 20,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                            Text(
                              "This is a new story. Write your story here.",
                              style: GoogleFonts.luxuriousRoman(
                                fontSize: 16,
                                color: Colors.black87,
                              ),
                            ),
                          ],
                        ),
                      )
                    : SelectableText(
                        storyController.currentChapter.value,
                        style: GoogleFonts.luxuriousRoman(
                          fontSize: 13,
                          color: Colors.black87,
                        ),
                      );
              }),
            ),
            const SizedBox(height: 10),
            Obx(() {
              bool isFirstChapterCreated =
                  storyController.firstChapterCreated.isTrue;
              return Column(
                children: [
                  Container(
                    height: 90,
                    width: double.infinity,
                    margin: EdgeInsets.only(bottom: 10),
                    decoration: BoxDecoration(
                      color: const Color(0xFFE7E7E7),
                      borderRadius: BorderRadius.circular(10),
                    ),
                    child: TextFormField(
                      controller: storyController.storyController,
                      cursorColor: Colors.black,
                      style: const TextStyle(
                        color: Colors.black,
                        fontSize: 14,
                      ),
                      decoration: InputDecoration(
                        contentPadding: const EdgeInsets.all(10),
                        suffixIcon: IconButton(
                          icon: const Icon(Icons.arrow_upward_rounded,
                              color: Colors.black54),
                          onPressed: () => storyController.createChapter(),
                        ),
                        hintText: 'Describe your imagination',
                        hintStyle: GoogleFonts.calligraffitti(
                          color: Colors.black54,
                          fontSize: 14,
                          fontWeight: FontWeight.bold,
                        ),
                        border: InputBorder.none,
                      ),
                      maxLines: 2,
                    ),
                  ),
                  if (isFirstChapterCreated) ...[
                    const SizedBox(width: 10),
                    Row(
                      crossAxisAlignment: CrossAxisAlignment.center,
                      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                      children: [
                        Expanded(
                          child: TextButton(
                            style: ButtonStyle(
                              backgroundColor: WidgetStateProperty.all(
                                  Color.fromARGB(255, 52, 52, 52)),
                              shape: WidgetStateProperty.all(
                                RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(10),
                                ),
                              ),
                            ),
                            onPressed: () => storyController.startSpeaking(),
                            child: Text(
                                textAlign: TextAlign.center,
                                "Listen Story",
                                style: TextStyle(
                                    color: bgColor,
                                    fontSize: 13,
                                    fontWeight: FontWeight.bold)),
                          ),
                        ),
                        const SizedBox(width: 10),
                        Expanded(
                          child: TextButton(
                            style: ButtonStyle(
                              backgroundColor: WidgetStateProperty.all(
                                  const Color.fromARGB(255, 52, 52, 52)),
                              shape: WidgetStateProperty.all(
                                RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(10),
                                ),
                              ),
                            ),
                            onPressed: () => storyController.createChapter(),
                            child: Text(
                                textAlign: TextAlign.center,
                                "Next Chapter ",
                                style: TextStyle(
                                    color: bgColor, fontSize: 13)),
                          ),
                        ),
                      ],
                    ),
                  ]
                ],
              );
            }),
            const SizedBox(height: 10),
          ],
        ),
      ),
    );
  }
}
