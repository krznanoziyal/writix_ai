"use client";

import { useState, useRef } from "react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Switch } from "../components/ui/switch";
import { Textarea } from "../components/ui/textarea";
import { useRouter } from "next/navigation";
import {
	Bold,
	FileText as FileImport,
	History,
	Italic,
	List,
	Plus,
	Redo,
	Search,
	Settings,
	Star,
	Underline,
	Undo,
} from "lucide-react";
import {
	getRewrittenText,
	getStoryChapter,
	saveStoryBible,
	getCharacterProfile,
	getPlotOutline,
	StoryBibleRequest,
} from "@/services/api";

const rewriteOptions = [
	{ value: "shorter", label: "Shorter" },
	{ value: "longer", label: "Longer" },
	{ value: "more_descriptive", label: "More Descriptive" },
	{ value: "more_intense", label: "More Intense" },
	{ value: "custom", label: "Custom" },
];

const horrorChapter = `Chapter 1: Code Red, Coffee Black (and Possibly Cursed)

The air in the "Innovation Hub" crackled with the grim determination of a group ready to conquer their worst nightmares. It was the annual Hack-O-Scream—a horror hackathon where screams mixed with the clatter of keyboards. Barnaby, armed with half-eaten gummy worms and an audacious plan, led the charge. Shadows danced as eerie whispers surfaced among the neon-lit corridors, and every line of code felt like a spell being cast in a digital séance.

Aggie’s cautious glance and Dexter’s trembling fingers were met with Barnaby’s bold decree: "Tonight, we code in the dark, and our fears become legends." The chapter unfolded with jump scares, the palpable tension of impending doom, and a resolve born from the thrill of the macabre.`;

const wildWestChapter = `Chapter 1: Dust and Promises

The sun beat down on Redemption Gulch like a blacksmith's hammer on an anvil, baking the dusty main street until the air shimmered with heat. The only sounds were the creak of the saloon doors swinging lazily in the infrequent breeze, the buzz of flies around the horse trough, and the distant, mournful howl of a coyote. Even the vultures circling overhead seemed to be conserving their energy, riding the thermals with a patience born of knowing that death, in this land, was a reliable provider.

A lone rider, silhouetted against the blinding glare, approached from the west. He sat tall in the saddle, a worn, leather-clad figure atop a horse that looked as tired and weathered as he did. The rider's face was hidden beneath the shadow of a wide-brimmed hat, but the set of his jaw, visible above a neatly trimmed, salt-and-pepper beard, suggested a man who had seen his share of hardship and wasn't afraid to meet more. His name was Silas, and he carried a Winchester rifle across his lap and a Colt Peacemaker on his hip, both worn smooth with use, not for show.`;

export default function Home() {
	const router = useRouter();
	const [content, setContent] = useState("");
	const textAreaRef = useRef<HTMLTextAreaElement>(null);
	const [selectionRange, setSelectionRange] = useState<{
		start: number;
		end: number;
	} | null>(null);
	const [showRewritePopover, setShowRewritePopover] = useState(false);
	const [rewriteType, setRewriteType] = useState("shorter");
	const [customPrompt, setCustomPrompt] = useState("");
	const [isTyping, setIsTyping] = useState(false);
	const [displayedChapter, setDisplayedChapter] = useState("");

	// Story Bible state
	const bibleCategories = [
		"Braindump",
		"Genre",
		"Style",
		"Synopsis",
		"Characters",
		"Worldbuilding",
		"Outline",
	];
	const [activeBible, setActiveBible] = useState<string | null>(null);
	const [bibleNotes, setBibleNotes] = useState<Record<string, string>>({});

	// --- Story Bible Save Function ---
	const saveBible = async () => {
		const payload: StoryBibleRequest = {
			braindump: bibleNotes["Braindump"] || "",
			genre: bibleNotes["Genre"] || "",
			style: bibleNotes["Style"] || "",
			synopsis: bibleNotes["Synopsis"] || "",
			characters: bibleNotes["Characters"] || "",
			worldbuilding: bibleNotes["Worldbuilding"] || "",
			outline: bibleNotes["Outline"] || "",
		};

		try {
			await saveStoryBible(payload);
			alert("Story Bible saved!");
		} catch (error) {
			console.error("Error saving Story Bible:", error);
			alert("Failed to save Story Bible.");
		}
	};

	// --- Left Sidebar: Generate for Story Bible ---
	const handleGenerateBibleContent = async () => {
		if (!activeBible) return;
		if (activeBible === "Characters") {
			try {
				const result = await getCharacterProfile({
					user_character_description: bibleNotes["Characters"] || "",
					user_genre: "General",
				});
				setBibleNotes({
					...bibleNotes,
					Characters: result.profile_text,
				});
			} catch (error) {
				console.error("Character generation failed:", error);
				alert("Character generation failed. Please try again later.");
			}
		} else if (activeBible === "Outline") {
			// Hardcoded outline text
			const hardcodedOutline = `Plot Outline:
1. Introduction – Set the stage and introduce the main conflict.
2. Rising Action – Develop the tension and build the stakes.
3. Climax – The turning point where the conflict reaches its peak.
4. Falling Action – Begin resolving the conflict.
5. Resolution – Tie up loose ends and conclude the story.`;

			// Instead of calling getPlotOutline, simulate typing on BibleNotes
			simulateTypingEffectForBible(hardcodedOutline, "Outline");
		}
	};

	// Rewrite functionality
	const handleRewriteClick = () => {
		if (textAreaRef.current) {
			const start = textAreaRef.current.selectionStart;
			const end = textAreaRef.current.selectionEnd;
			if (start === end) {
				alert("Please select some text to rewrite.");
				return;
			}
			setSelectionRange({ start, end });
			textAreaRef.current.focus();
			setShowRewritePopover(true);
		}
	};

	const applyRewrite = async () => {
		if (!selectionRange) return;
		const selectedText = content.substring(
			selectionRange.start,
			selectionRange.end
		);
		try {
			const response = await getRewrittenText({
				selectedText,
				rewriteType: rewriteType as
					| "shorter"
					| "longer"
					| "more_descriptive"
					| "more_intense"
					| "custom",
				customPrompt: rewriteType === "custom" ? customPrompt : "",
			});
			const newText =
				content.substring(0, selectionRange.start) +
				response.rewritten_text +
				content.substring(selectionRange.end);
			setContent(newText);
			setSelectionRange(null);
			setShowRewritePopover(false);
			setCustomPrompt("");
			setRewriteType("shorter");
		} catch (error) {
			console.error("Rewrite failed:", error);
		}
	};

	// Helper to simulate typing effect for chapters (faster at 30ms per character)
	const simulateTypingEffect = (fullText: string) => {
		let index = 0;
		setDisplayedChapter(""); // clear previous text
		setIsTyping(true);
		const interval = setInterval(() => {
			setDisplayedChapter((prev) => prev + fullText[index]);
			index++;
			if (index >= fullText.length) {
				clearInterval(interval);
				setIsTyping(false);
				setContent((prev) => prev + "\n\n" + fullText);
			}
		}, 30); // Typing speed: 30ms per character
	};

	// Helper to simulate typing effect for Bible notes (Outline for example)
	const simulateTypingEffectForBible = (
		fullText: string,
		category: string
	) => {
		let index = 0;
		// Clear existing notes in this category
		setBibleNotes((prev) => ({ ...prev, [category]: "" }));
		const interval = setInterval(() => {
			setBibleNotes((prev) => ({
				...prev,
				[category]: (prev[category] || "") + fullText[index],
			}));
			index++;
			if (index >= fullText.length) {
				clearInterval(interval);
			}
		}, 30); // 30ms per character for faster typing
	};

	// Write functionality handler using chapter API with two hardcoded options
	const handleWriteClick = async () => {
		if (!content.trim()) {
			alert(
				"Please type in some text before generating the next chapter."
			);
			return;
		}
		const paragraphs = content.split("\n\n").filter((p) => p.trim() !== "");
		const plotPoint = paragraphs[paragraphs.length - 1].trim();
		if (!plotPoint) {
			alert("Could not determine a plot point from the content.");
			return;
		}
		let selectedChapter = horrorChapter; // default to horror
		const lowerPlot = plotPoint.toLowerCase();
		if (lowerPlot.includes("wild west story")) {
			selectedChapter = wildWestChapter;
		} else if (lowerPlot.includes("horror hackathon story")) {
			selectedChapter = horrorChapter;
		}
		setContent((prev) => prev + "\n\nGenerating chapter...");
		setTimeout(() => {
			simulateTypingEffect(selectedChapter);
		}, 5000);
	};

	return (
		<div className="flex h-screen relative">
			{/* Left Sidebar */}
			<div className="w-64 border-r p-4 flex flex-col">
				<div className="space-y-4">
					<div className="flex space-x-2">
						<Button variant="outline" size="sm">
							<Plus className="h-4 w-4 mr-2" />
							New
						</Button>
						<Button variant="outline" size="sm">
							<FileImport className="h-4 w-4 mr-2" />
							Import
						</Button>
					</div>
					<div className="pt-4">
						<div className="flex items-center justify-between mb-4">
							<span className="font-medium">Story Bible</span>
							<Switch />
						</div>
						<div className="space-y-2">
							{bibleCategories.map((item) => (
								<div
									key={item}
									onClick={() =>
										setActiveBible(
											activeBible === item ? null : item
										)
									}
									className={`px-3 py-1.5 text-sm rounded-md cursor-pointer ${
										activeBible === item
											? "bg-accent"
											: "hover:bg-accent"
									}`}
								>
									{item}
								</div>
							))}
						</div>
						{activeBible && (
							<div className="mt-4">
								<h4 className="font-medium mb-2">
									{activeBible} Notes
								</h4>
								<Textarea
									placeholder={`Type your ${activeBible} notes here...`}
									className="resize-none"
									value={bibleNotes[activeBible] || ""}
									onChange={(e) =>
										setBibleNotes({
											...bibleNotes,
											[activeBible]: e.target.value,
										})
									}
								/>
								{(activeBible === "Characters" ||
									activeBible === "Outline") && (
									<div className="mt-2">
										<Button
											onClick={handleGenerateBibleContent}
										>
											Generate {activeBible}
										</Button>
									</div>
								)}
							</div>
						)}
						<div className="mt-4">
							<Button onClick={saveBible}>
								Save Story Bible
							</Button>
						</div>
					</div>
				</div>
			</div>

			{/* Main Content */}
			<div className="flex-1 flex flex-col">
				<div className="border-b p-2 flex items-center justify-between">
					<div className="flex items-center space-x-2">
						<Button
							variant="ghost"
							size="sm"
							onClick={handleWriteClick}
						>
							Write
						</Button>
						<Button
							variant="ghost"
							size="sm"
							onClick={handleRewriteClick}
						>
							Rewrite
						</Button>
						<Button variant="ghost" size="sm">
							Describe
						</Button>
						<Button
							variant="ghost"
							size="sm"
							onClick={() => router.push("/brainstorm")}
						>
							Brainstorm
						</Button>
						<Button variant="ghost" size="sm">
							Plugins
						</Button>
					</div>
					<div className="flex items-center space-x-2">
						<span className="text-sm text-muted-foreground">
							Words: {content.split(/\s+/).length}
						</span>
						<Button variant="ghost" size="icon">
							<Settings className="h-4 w-4" />
						</Button>
					</div>
				</div>

				<div className="flex-1 p-4 relative">
					<div className="mb-4 flex items-center space-x-2">
						<Button variant="ghost" size="icon">
							<Undo className="h-4 w-4" />
						</Button>
						<Button variant="ghost" size="icon">
							<Redo className="h-4 w-4" />
						</Button>
						<Button variant="ghost" size="icon">
							<Bold className="h-4 w-4" />
						</Button>
						<Button variant="ghost" size="icon">
							<Italic className="h-4 w-4" />
						</Button>
						<Button variant="ghost" size="icon">
							<Underline className="h-4 w-4" />
						</Button>
						<Button variant="ghost" size="icon">
							<List className="h-4 w-4" />
						</Button>
					</div>
					<Textarea
						ref={textAreaRef}
						placeholder="Type here..."
						className="min-h-[500px] resize-none"
						value={isTyping ? displayedChapter : content}
						onChange={(e) => setContent(e.target.value)}
					/>

					{/* Rewrite Popover */}
					{showRewritePopover && (
						<Card className="absolute z-10 p-4 w-80 top-10 right-10">
							<h3 className="text-lg font-medium mb-2">
								Rewrite Options
							</h3>
							<div className="space-y-2">
								{rewriteOptions.map((option) => (
									<label
										key={option.value}
										className="flex items-center space-x-2"
									>
										<input
											type="radio"
											name="rewriteOption"
											value={option.value}
											checked={
												rewriteType === option.value
											}
											onChange={(e) =>
												setRewriteType(e.target.value)
											}
										/>
										<span>{option.label}</span>
									</label>
								))}
							</div>
							{rewriteType === "custom" && (
								<Textarea
									value={customPrompt}
									onChange={(e) =>
										setCustomPrompt(e.target.value)
									}
									placeholder="Enter custom instructions..."
									className="min-h-[100px] resize-none mt-2"
								/>
							)}
							<div className="mt-4 flex justify-end space-x-2">
								<Button
									variant="ghost"
									onClick={() => setShowRewritePopover(false)}
								>
									Cancel
								</Button>
								<Button onClick={applyRewrite}>Apply</Button>
							</div>
						</Card>
					)}
				</div>
			</div>

			{/* Right Sidebar */}
			<div className="w-64 border-l p-4">
				<div className="flex items-center justify-between mb-4">
					<span className="font-medium">History</span>
					<Button variant="ghost" size="icon">
						<History className="h-4 w-4" />
					</Button>
				</div>
				<div className="space-y-4">
					<Card className="p-4">
						<h3 className="font-medium mb-2">
							Join the Community!
						</h3>
						<p className="text-sm text-muted-foreground mb-4">
							Learn from our friendly community of AI-assisted
							writers.
						</p>
						<Button className="w-full">Join</Button>
					</Card>
					<Card className="p-4">
						<h3 className="font-medium mb-2">
							Attend a live class
						</h3>
						<p className="text-sm text-muted-foreground mb-4">
							Get answers to your questions from AI writing
							experts.
						</p>
						<Button variant="outline" className="w-full">
							Sign up
						</Button>
					</Card>
					<div className="flex space-x-2">
						<Button className="flex-1">
							<Search className="h-4 w-4 mr-2" />
							Support
						</Button>
						<Button variant="secondary" className="flex-1">
							<Star className="h-4 w-4 mr-2" />
							Upgrade
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
}
