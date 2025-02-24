// ============= Base Widgets =============
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:st/controller/brainstorm_controller.dart';
import 'package:st/theme.dart';

class BrainstormBase extends StatelessWidget {
  final String title;
  final List<Widget> additionalContent;
  final BrainstormController brainstormController =
      Get.put(BrainstormController());

  BrainstormBase({
    super.key,
    required this.title,
    this.additionalContent = const [],
  });

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: bgColor,
      body: Container(
        margin: const EdgeInsets.only(left: 20, right: 20, top: 50, bottom: 30),
        height: double.infinity,
        child: SingleChildScrollView(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.start,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Container(
                width: double.infinity,
                alignment: Alignment.center,
                child: Text(
                  "$title Brainstorm",
                  style: GoogleFonts.calligraffitti(
                    textStyle: const TextStyle(
                      color: Color(0xFF5C5C5C),
                      fontSize: 19,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
              ),
              const Divider(color: Colors.black, thickness: 0.1),
              ...additionalContent,
              TextButton(
                onPressed: () => brainstormController.generateBrainstorm(),
                style: ElevatedButton.styleFrom(
                  backgroundColor: const Color(0xFF5C5C5C),
                  padding:
                      const EdgeInsets.symmetric(horizontal: 20, vertical: 10),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(10),
                  ),
                ),
                child: Container(
                  height: 30,
                  alignment: Alignment.center,
                  width: double.infinity,
                  child: Text(
                    "Start Brainstorming",
                    style: GoogleFonts.duruSans(
                      fontSize: 13,
                      color: Colors.white,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
              ),

              // Display the generated brainstorm
              Obx(() {
                if (brainstormController.brainstormIdea.isEmpty) {
                  return const SizedBox.shrink();
                }
                return Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const SizedBox(height: 20),
                    Text(
                      "Generated Brainstorm",
                      style: GoogleFonts.duruSans(
                        fontSize: 13,
                        fontWeight: FontWeight.bold,
                        color: const Color(0xFF5C5C5C),
                      ),
                    ),
                    const SizedBox(height: 10),
                    Container(
                      width: MediaQuery.of(context).size.width,
                      padding: const EdgeInsets.symmetric(horizontal: 10),
                      decoration: BoxDecoration(
                        color: const Color.fromARGB(255, 229, 229, 229),
                        borderRadius: BorderRadius.circular(8),
                      ),
                      child: Text(
                        brainstormController.brainstormIdea.toString().split(",").join("\n\n").replaceAll("[", "").replaceAll("]", ""),
                        style: GoogleFonts.duruSans(
                          fontSize: 13,
                          color: const Color.fromARGB(255, 146, 146, 146),
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                    ),
                  ],
                );
              }),
            ],
          ),
        ),
      ),
    );
  }
}

class BrainstormInputField extends StatelessWidget {
  final String label;
  final String hintText;
  final int? maxLines;
  final TextEditingController controller;

  const BrainstormInputField({
    super.key,
    required this.label,
    required this.hintText,
    required this.controller,
    this.maxLines = 3,
  });

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          label,
          style: GoogleFonts.duruSans(
            fontSize: 13,
            fontWeight: FontWeight.bold,
            color: const Color(0xFF5C5C5C),
          ),
        ),
        const SizedBox(height: 10),
        Container(
          width: MediaQuery.of(context).size.width,
          padding: const EdgeInsets.symmetric(horizontal: 10),
          decoration: BoxDecoration(
            color: const Color.fromARGB(255, 229, 229, 229),
            borderRadius: BorderRadius.circular(8),
          ),
          child: TextFormField(
            maxLines: maxLines,
            decoration: InputDecoration(
              hintText: hintText,
              hintStyle: GoogleFonts.duruSans(
                fontSize: 13,
                color: const Color.fromARGB(255, 146, 146, 146),
                fontWeight: FontWeight.bold,
              ),
              border: InputBorder.none,
            ),
          ),
        ),
        const SizedBox(height: 20),
      ],
    );
  }
}

// ============= Individual Brainstorm Pages =============

// 1. Article Ideas Brainstorm
class ArticleIdeasBrainstorm extends StatelessWidget {
  ArticleIdeasBrainstorm({super.key});
  final BrainstormController brainstormController =
      Get.put(BrainstormController());

  @override
  Widget build(BuildContext context) {
    return BrainstormBase(
      title: "Article",
      additionalContent: [
        BrainstormInputField(
          controller: brainstormController.listOf,
          label: "Topic/Theme",
          hintText: "Enter the main topic or theme for your article",
        ),
        BrainstormInputField(
          controller: brainstormController.context,
          label: "Target Audience",
          hintText: "Who is this article intended for?",
        ),
        BrainstormInputField(
          controller: brainstormController.examples,
          label: "Examples (optional)",
          hintText: "some examples",
        ),
      ],
    );
  }
}

// 2. Character Brainstorm
class CharacterBrainstorm extends StatelessWidget {
  CharacterBrainstorm({super.key});

  final BrainstormController brainstormController =
      Get.put(BrainstormController());

  @override
  Widget build(BuildContext context) {
    return BrainstormBase(
      title: "Character",
      additionalContent: [
        BrainstormInputField(
          controller: brainstormController.listOf,
          label: "Character Type",
          hintText: "Protagonist, antagonist, supporting character, etc.",
        ),
        BrainstormInputField(
          controller: brainstormController.context,
          label: "Setting/Context",
          hintText: "What world or situation is this character in?",
        ),
        BrainstormInputField(
          controller: brainstormController.examples,
          label: "Examples (optional)",
          hintText: "some examples",
        ),
      ],
    );
  }
}

// 3. Description Brainstorm
class DescriptionBrainstorm extends StatelessWidget {
  DescriptionBrainstorm({super.key});
  final BrainstormController brainstormController =
      Get.put(BrainstormController());

  @override
  Widget build(BuildContext context) {
    return BrainstormBase(
      title: "Description",
      additionalContent: [
        BrainstormInputField(
          controller: brainstormController.listOf,
          label: "Subject",
          hintText: "What are you describing?",
        ),
        BrainstormInputField(
          controller: brainstormController.context,
          label: "Mood/Tone",
          hintText: "What feeling do you want to convey?",
        ),
        BrainstormInputField(
          controller: brainstormController.examples,
          label: "Examples (optional)",
          hintText: "some examples",
        ),
      ],
    );
  }
}

// 4. Dialogue Brainstorm
class DialogueBrainstorm extends StatelessWidget {
  DialogueBrainstorm({super.key});
  final BrainstormController brainstormController =
      Get.put(BrainstormController());

  @override
  Widget build(BuildContext context) {
    return BrainstormBase(
      title: "Dialogue",
      additionalContent: [
        BrainstormInputField(
          controller: brainstormController.listOf,
          label: "Give me a list of ideas",
          hintText: "a guy with million dreams",
        ),
        BrainstormInputField(
          controller: brainstormController.context,
          label: "Context (optional)",
          hintText: "he loves to travel",
        ),
        BrainstormInputField(
          controller: brainstormController.examples,
          label: "Examples (optional)",
          hintText: "some examples",
        ),
      ],
    );
  }
}

// 5. Names Brainstorm
class NamesBrainstorm extends StatelessWidget {
  NamesBrainstorm({super.key});

  final BrainstormController brainstormController =
      Get.put(BrainstormController());

  @override
  Widget build(BuildContext context) {
    return BrainstormBase(
      title: "Names",
      additionalContent: [
        BrainstormInputField(
          controller: brainstormController.listOf,
          label: "Type of Name",
          hintText: "Character name, place name, business name, etc.",
        ),
        BrainstormInputField(
          controller: brainstormController.context,
          label: "Cultural Context",
          hintText: "Any specific cultural or historical context?",
        ),
        BrainstormInputField(
          controller: brainstormController.examples,
          label: "Examples (optional)",
          hintText: "some examples",
        ),
      ],
    );
  }
}

// 6. Objects Brainstorm
class ObjectsBrainstorm extends StatelessWidget {
  ObjectsBrainstorm({super.key});

  final BrainstormController brainstormController =
      Get.put(BrainstormController());

  @override
  Widget build(BuildContext context) {
    return BrainstormBase(
      title: "Objects",
      additionalContent: [
        BrainstormInputField(
          controller: brainstormController.listOf,
          label: "Object Category",
          hintText: "Magical items, everyday objects, technology, etc.",
        ),
        BrainstormInputField(
          controller: brainstormController.context,
          label: "Purpose/Function",
          hintText: "What role does this object serve?",
        ),
        BrainstormInputField(
          controller: brainstormController.examples,
          label: "Examples (optional)",
          hintText: "some examples",
        ),
      ],
    );
  }
}

// 7. Place Brainstorm
class PlaceBrainstorm extends StatelessWidget {
  PlaceBrainstorm({super.key});

  final BrainstormController brainstormController =
      Get.put(BrainstormController());

  @override
  Widget build(BuildContext context) {
    return BrainstormBase(
      title: "Place",
      additionalContent: [
        BrainstormInputField(
          controller: brainstormController.listOf,
          label: "Location Type",
          hintText: "City, building, natural landmark, etc.",
        ),
        BrainstormInputField(
          controller: brainstormController.context,
          label: "Setting Details",
          hintText: "Time period, atmosphere, significance",
        ),
        BrainstormInputField(
          controller: brainstormController.examples,
          label: "Examples (optional)",
          hintText: "some examples",
        ),
      ],
    );
  }
}

// 8. Plot Points Brainstorm
class PlotPointsBrainstorm extends StatelessWidget {
  PlotPointsBrainstorm({super.key});

  final BrainstormController brainstormController =
      Get.put(BrainstormController());

  @override
  Widget build(BuildContext context) {
    return BrainstormBase(
      title: "Plots",
      additionalContent: [
        BrainstormInputField(
          controller: brainstormController.listOf,
          label: "Story Genre",
          hintText: "Fantasy, mystery, romance, etc.",
        ),
        BrainstormInputField(
          controller: brainstormController.context,
          label: "Key Characters",
          hintText: "Who are the main players in this plot?",
        ),
        BrainstormInputField(
          controller: brainstormController.examples,
          label: "Examples (optional)",
          hintText: "some examples",
        ),
      ],
    );
  }
}

// 9. Something Else Brainstorm
class SomethingElseBrainstorm extends StatelessWidget {
  SomethingElseBrainstorm({super.key});

  final BrainstormController brainstormController =
      Get.put(BrainstormController());

  @override
  Widget build(BuildContext context) {
    return BrainstormBase(
      title: "Random",
      additionalContent: [
        BrainstormInputField(
          controller: brainstormController.listOf,
          label: "What do you want to brainstorm?",
          hintText: "Enter any topic or idea",
        ),
        BrainstormInputField(
          controller: brainstormController.context,
          label: "Additional Context",
          hintText: "Any specific requirements or preferences?",
        ),
        BrainstormInputField(
          controller: brainstormController.examples,
          label: "Examples (optional)",
          hintText: "some examples",
        ),
      ],
    );
  }
}

// 10. Tweets Brainstorm
class TweetsBrainstorm extends StatelessWidget {
  TweetsBrainstorm({super.key});

  final BrainstormController brainstormController =
      Get.put(BrainstormController());

  @override
  Widget build(BuildContext context) {
    return BrainstormBase(
      title: "Tweets",
      additionalContent: [
        BrainstormInputField(
          controller: brainstormController.listOf,
          label: "Topic/Theme",
          hintText: "What's your tweet about?",
          maxLines: 2,
        ),
        BrainstormInputField(
          controller: brainstormController.context,
          label: "Tone",
          hintText: "Casual, professional, humorous, etc.",
        ),
        BrainstormInputField(
          controller: brainstormController.examples,
          label: "Examples (optional)",
          hintText: "some examples",
        ),
      ],
    );
  }
}

// 11. World Building Brainstorm
class WorldBuildingBrainstorm extends StatelessWidget {
  WorldBuildingBrainstorm({super.key});

  final BrainstormController brainstormController =
      Get.put(BrainstormController());

  @override
  Widget build(BuildContext context) {
    return BrainstormBase(
      title: "World Building",
      additionalContent: [
        BrainstormInputField(
          controller: brainstormController.listOf,
          label: "World Type",
          hintText: "Fantasy realm, future society, alternate history, etc.",
        ),
        BrainstormInputField(
          controller: brainstormController.context,
          label: "Key Features",
          hintText: "Magic system, technology, social structure, etc.",
        ),
        BrainstormInputField(
          controller: brainstormController.examples,
          label: "Examples (optional)",
          hintText: "some examples",
        ),
      ],
    );
  }
}
