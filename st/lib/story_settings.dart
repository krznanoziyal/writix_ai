import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:st/brainstrom.dart';
import 'package:st/theme.dart';

class StorySettingsController extends GetxController {
  var selectedGenre = RxnString();
}

class StorySettings extends StatelessWidget {
  const StorySettings({super.key});

  @override
  Widget build(BuildContext context) {
    final StorySettingsController controller =
        Get.put(StorySettingsController());

    return Scaffold(
      backgroundColor: bgColor,
      body: SingleChildScrollView(
        child: Container(
          margin: const EdgeInsets.only(top: 50, left: 20, right: 20),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.start,
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Container(
                width: double.infinity,
                alignment: Alignment.center,
                child: Text(
                  "Story Settings",
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
              Text(
                "Select Genre",
                style: GoogleFonts.duruSans(
                  fontSize: 13,
                  fontWeight: FontWeight.bold,
                  color: const Color(0xFF5C5C5C),
                ),
              ),
              const SizedBox(height: 10),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 10),
                decoration: BoxDecoration(
                  color: const Color.fromARGB(255, 223, 223, 223),
                  borderRadius: BorderRadius.circular(8),
                ),
                child: Obx(
                  () => DropdownButtonHideUnderline(
                    child: DropdownButton<String>(
                      isExpanded: true,
                      value: controller.selectedGenre.value,
                      style: GoogleFonts.duruSans(
                        fontSize: 13,
                        color: const Color(0xFF5C5C5C),
                      ),
                      items: const [
                        DropdownMenuItem(
                            value: "Fantasy", child: Text("Fantasy")),
                        DropdownMenuItem(
                            value: "Sci-Fi", child: Text("Sci-Fi")),
                        DropdownMenuItem(
                            value: "Horror", child: Text("Horror")),
                        DropdownMenuItem(
                            value: "Romance", child: Text("Romance")),
                        DropdownMenuItem(
                            value: "Mystery", child: Text("Mystery")),
                        DropdownMenuItem(
                            value: "Adventure", child: Text("Adventure")),
                        DropdownMenuItem(
                            value: "Thriller", child: Text("Thriller")),
                        DropdownMenuItem(
                            value: "Historical", child: Text("Historical")),
                        DropdownMenuItem(
                            value: "Dystopian", child: Text("Dystopian")),
                        DropdownMenuItem(
                            value: "Comedy", child: Text("Comedy")),
                        DropdownMenuItem(
                            value: "Action", child: Text("Action")),
                        DropdownMenuItem(value: "Drama", child: Text("Drama")),
                      ],
                      onChanged: (String? newValue) {
                        controller.selectedGenre.value = newValue;
                      },
                      hint: Text(
                        "Select Genre",
                        style: GoogleFonts.duruSans(
                          fontSize: 13,
                          color: const Color(0xFF5C5C5C),
                        ),
                      ),
                    ),
                  ),
                ),
              ),
              const SizedBox(height: 30),
              Text(
                "Build World",
                style: GoogleFonts.duruSans(
                  fontSize: 13,
                  fontWeight: FontWeight.bold,
                  color: Color(0xFF5C5C5C),
                ),
              ),
              const SizedBox(height: 10),
              Container(
                padding: const EdgeInsets.symmetric(horizontal: 10),
                decoration: BoxDecoration(
                  color: const Color.fromARGB(255, 223, 223, 223),
                  borderRadius: BorderRadius.circular(8),
                ),
                child: TextFormField(
                  maxLines: 3,
                  decoration: InputDecoration(
                    hintText: "Enter the world of your imagination",
                    hintStyle: GoogleFonts.duruSans(
                      fontSize: 13,
                      color: Color(0xFF5C5C5C),
                      fontWeight: FontWeight.bold,
                    ),
                    border: InputBorder.none,
                  ),
                ),
              ),
              const SizedBox(height: 20),
              Row(
                children: [
                  Text(
                    "Story Characters",
                    style: GoogleFonts.duruSans(
                      fontSize: 13,
                      fontWeight: FontWeight.bold,
                      color: Color(0xFF5C5C5C),
                    ),
                  ),
                  Spacer(),
                  IconButton(
                      icon: Icon(Icons.add, color: Color(0xFF5C5C5C)),
                      onPressed: () => {}),
                ],
              ),
              Container(
                width: double.infinity,
                padding: const EdgeInsets.all(10),
                margin: const EdgeInsets.only(bottom: 5),
                decoration: BoxDecoration(
                  color: Color(0xffE7E7E7),
                  borderRadius: BorderRadius.circular(10),
                ),
                child: Row(
                  children: [
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text("AGGIE",
                              style: GoogleFonts.duruSans(
                                fontSize: 12,
                                fontWeight: FontWeight.bold,
                              )),
                          Text("Main Character",
                              style: GoogleFonts.duruSans(
                                color: Colors.grey[600],
                                fontSize: 10,
                              )),
                        ],
                      ),
                    ),
                    IconButton(
                        onPressed: () {},
                        icon: const Icon(Icons.chat_bubble_outline)),
                  ],
                ),
              ),
              const SizedBox(height: 10),
              Row(
                children: [
                  Text(
                    "Story Chapters",
                    style: GoogleFonts.duruSans(
                      fontSize: 13,
                      fontWeight: FontWeight.bold,
                      color: Color(0xFF5C5C5C),
                    ),
                  ),
                  Spacer(),
                  IconButton(
                      icon: Icon(Icons.add, color: Color(0xFF5C5C5C)),
                      onPressed: () => {}),
                ],
              ),
              Container(
                width: double.infinity,
                padding: const EdgeInsets.all(10),
                margin: const EdgeInsets.only(bottom: 5),
                decoration: BoxDecoration(
                  color: Color(0xffE7E7E7),
                  borderRadius: BorderRadius.circular(10),
                ),
                child: Row(
                  children: [
                    Expanded(
                      child: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: [
                          Text("Chapter 1",
                              style: GoogleFonts.duruSans(
                                fontSize: 12,
                                fontWeight: FontWeight.bold,
                              )),
                          Text("Code Red, Coffee Black",
                              style: GoogleFonts.duruSans(
                                color: Colors.grey[600],
                                fontSize: 10,
                              )),
                        ],
                      ),
                    ),
                    IconButton(
                        onPressed: () {},
                        icon: const Icon(Icons.file_download_rounded)),
                  ],
                ),
              ),
              const SizedBox(height: 10),
              TextButton.icon(
                onPressed: () => Get.to(() => BrainstormPage(),
                    transition: Transition.rightToLeft),
                style: TextButton.styleFrom(
                  backgroundColor: const Color.fromARGB(221, 39, 39, 39),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(5),
                  ),
                ),
                label: Text(
                  "Brainstorm",
                  style: TextStyle(
                    fontWeight: FontWeight.bold,
                    color: bgColor,
                  ),
                ),
                icon: Icon(Icons.reviews_outlined, color: bgColor),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
