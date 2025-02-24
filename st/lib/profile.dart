import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:st/theme.dart';

class Profile extends StatelessWidget {
  const Profile({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: bgColor,
      body: Container(
          margin: EdgeInsets.only(left: 20, right: 20, top: 50, bottom: 30),
          height: double.infinity,
          child: Column(
            children: [
              Container(
                width: double.infinity,
                alignment: Alignment.center,
                child: Text(
                  "Jainam Barbhaya's Stories",
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
                          Text("The Horrors of Hackathon",
                              style: GoogleFonts.duruSans(
                                fontSize: 12,
                                fontWeight: FontWeight.bold,
                              )),
                          Text("Horror, Comedy",
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
              const SizedBox(height: 30),

              // create story button
              TextButton.icon(
                onPressed: () {},
                style: TextButton.styleFrom(
                  backgroundColor: const Color.fromARGB(221, 39, 39, 39),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(5),
                  ),
                ),
                label: Text(
                  "Create New Story",
                  style: TextStyle(
                    fontWeight: FontWeight.bold,
                    color: bgColor,
                  ),
                ),
                icon: Icon(Icons.add, color: bgColor),
              ),
            ],
          )),
    );
  }
}
