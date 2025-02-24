import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:get/get.dart';
import 'package:st/brainstorm_pages/brainstorm_base.dart';

import 'package:st/controller/brainstorm_controller.dart';
import 'package:st/theme.dart';

class BrainstormPage extends StatelessWidget {
  BrainstormPage({super.key});

  BrainstormController brainstormController = Get.put(BrainstormController());

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: bgColor,
      body: SingleChildScrollView(
        child: Container(
          margin:
              const EdgeInsets.only(left: 20, right: 20, top: 50, bottom: 30),
          child: Column(
            children: [
              Container(
                width: double.infinity,
                alignment: Alignment.center,
                child: Text(
                  "Brainstorm",
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
              const SizedBox(height: 40),
              BrainstormSection(
                  title: "Dialogue",
                  subtitle: "Conversations, Speech, Banter",
                  route: () => DialogueBrainstorm()),
              BrainstormSection(
                  title: "Character",
                  subtitle: "Personality, Motivations, Growth",
                  route: () => CharacterBrainstorm()),
              BrainstormSection(
                  title: "World Building",
                  subtitle: "Lore, Settings, Cultures",
                  route: () => WorldBuildingBrainstorm()),
              BrainstormSection(
                  title: "Plot Points",
                  subtitle: "Story Beats, Twists, Arcs",
                  route: () => PlotPointsBrainstorm()),
              BrainstormSection(
                  title: "Names",
                  subtitle: "Characters, Places, Unique Terms",
                  route: () => NamesBrainstorm()),
              BrainstormSection(
                  title: "Place",
                  subtitle: "Locations, Environments, Atmosphere",
                  route: () => PlaceBrainstorm()),
              BrainstormSection(
                  title: "Objects",
                  subtitle: "Artifacts, Technology, Items of Significance",
                  route: () => ObjectsBrainstorm()),
              BrainstormSection(
                  title: "Description",
                  subtitle: "Sensory Details, Imagery, Style",
                  route: () => DescriptionBrainstorm()),
              BrainstormSection(
                  title: "Article Ideas",
                  subtitle: "Topics, Insights, Thought Starters",
                  route: () => ArticleIdeasBrainstorm()),
              BrainstormSection(
                  title: "Tweets",
                  subtitle: "Short Thoughts, Engagement Hooks, Witty Lines",
                  route: () => TweetsBrainstorm()),
              BrainstormSection(
                  title: "Something Else",
                  subtitle: "Miscellaneous, Unique Concepts, Open-ended",
                  route: () => SomethingElseBrainstorm()),
            ],
          ),
        ),
      ),
    );
  }
}

class BrainstormSection extends StatelessWidget {
  final String title;
  final String subtitle;
  final Widget Function() route;

  const BrainstormSection({
    super.key,
    required this.title,
    required this.subtitle,
    required this.route,
  });

  @override
  Widget build(BuildContext context) {
    final brainstormController =
        Get.find<BrainstormController>(); // Find the controller

    return GestureDetector(
      onTap: () {
        brainstormController.selectedCategory.value = title;
        Get.to(route, transition: Transition.rightToLeft);
      },
      child: Container(
        width: double.infinity,
        padding: const EdgeInsets.all(15),
        margin: const EdgeInsets.only(bottom: 5),
        decoration: BoxDecoration(
          color: const Color(0xffE7E7E7),
          borderRadius: BorderRadius.circular(10),
        ),
        child: Row(
          children: [
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(title,
                      style: GoogleFonts.duruSans(
                        fontSize: 12,
                        fontWeight: FontWeight.bold,
                      )),
                  Text(subtitle,
                      style: GoogleFonts.duruSans(
                        color: Colors.grey[600],
                        fontSize: 10,
                      )),
                ],
              ),
            ),
            const Icon(Icons.arrow_forward_ios),
          ],
        ),
      ),
    );
  }
}
