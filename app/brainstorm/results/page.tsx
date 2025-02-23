"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { ArrowLeft, Plus, ThumbsDown, ThumbsUp, X } from "lucide-react";
import { useEffect, useState } from "react";

export default function ResultsPage() {
	const router = useRouter();
	const [ideas, setIdeas] = useState<string[]>([]);
	const [keepers, setKeepers] = useState<string[]>([]);

	useEffect(() => {
		const results = localStorage.getItem("brainstormResults");
		if (results) {
			const parsedResults = JSON.parse(results);
			if (parsedResults.ideas && Array.isArray(parsedResults.ideas)) {
				setIdeas(parsedResults.ideas);
			}
		}
	}, []);

	const addToKeepers = (idea: string) => {
		setKeepers((prev) => [...prev, idea]);
		setIdeas((prev) => prev.filter((i) => i !== idea));
	};

	return (
		<div className="min-h-screen p-8">
			<div className="max-w-4xl mx-auto">
				<div className="flex justify-between mb-8">
					<Button
						variant="ghost"
						size="icon"
						onClick={() => router.push("/brainstorm/kickstart")}
					>
						<ArrowLeft className="h-6 w-6" />
					</Button>
					<h1 className="text-2xl font-bold text-center">
						Let&apos;s brainstorm!
					</h1>
					<Button
						variant="ghost"
						size="icon"
						onClick={() => router.push("/")}
					>
						<X className="h-6 w-6" />
					</Button>
				</div>

				<div className="grid grid-cols-3 gap-8">
					<div className="col-span-2 space-y-4">
						{ideas.map((idea, index) => (
							<Card key={index} className="p-4">
								<div className="flex items-start gap-4">
									<p className="flex-1">{idea}</p>
									<div className="flex gap-2">
										<Button variant="ghost" size="icon">
											<ThumbsDown className="h-4 w-4" />
										</Button>
										<Button
											variant="ghost"
											size="icon"
											onClick={() => addToKeepers(idea)}
										>
											<ThumbsUp className="h-4 w-4" />
										</Button>
									</div>
								</div>
							</Card>
						))}
					</div>

					<div className="col-span-1">
						<Card className="p-4">
							<div className="flex items-center justify-between mb-4">
								<h2 className="text-lg font-medium">KEEPERS</h2>
								<Button size="icon" variant="ghost">
									<Plus className="h-4 w-4" />
								</Button>
							</div>
							<div className="space-y-4">
								{keepers.map((keeper, index) => (
									<Card key={index} className="p-3">
										<p className="text-sm">{keeper}</p>
									</Card>
								))}
							</div>
						</Card>

						<div className="mt-4">
							<Button className="w-full">Save & Exit</Button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
