'use client';

import { useState } from 'react';
import { Header, Footer } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Zap, Info, TrendingUp, Award, CheckCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { colleges } from '@/data/colleges';
import { College } from '@/types/college';

type ExamType = 'jee-main' | 'jee-advanced' | 'neet' | 'cat' | 'gate';

interface PredictionResult {
  tier: 'tier1' | 'tier2' | 'tier3' | 'tier4';
  colleges: College[];
  message: string;
  cutoff: number;
  isSample?: boolean;
}

const EXAM_CUTOFFS: Record<ExamType, { min: number; max: number; categories: Record<string, { min: number; max: number }> }> = {
  'jee-main': {
    min: 0,
    max: 300,
    categories: {
      tier1: { min: 200, max: 300 }, // IITs
      tier2: { min: 150, max: 200 }, // NITs
      tier3: { min: 100, max: 150 }, // Private tier-1
      tier4: { min: 0, max: 100 }, // Private tier-2
    },
  },
  'jee-advanced': {
    min: 0,
    max: 360,
    categories: {
      tier1: { min: 250, max: 360 },
      tier2: { min: 200, max: 250 },
      tier3: { min: 100, max: 200 },
      tier4: { min: 0, max: 100 },
    },
  },
  neet: {
    min: 0,
    max: 720,
    categories: {
      tier1: { min: 600, max: 720 },
      tier2: { min: 500, max: 600 },
      tier3: { min: 400, max: 500 },
      tier4: { min: 0, max: 400 },
    },
  },
  cat: {
    min: 0,
    max: 300,
    categories: {
      tier1: { min: 250, max: 300 },
      tier2: { min: 200, max: 250 },
      tier3: { min: 150, max: 200 },
      tier4: { min: 0, max: 150 },
    },
  },
  gate: {
    min: 0,
    max: 1000,
    categories: {
      tier1: { min: 700, max: 1000 },
      tier2: { min: 600, max: 700 },
      tier3: { min: 450, max: 600 },
      tier4: { min: 0, max: 450 },
    },
  },
};

const TIER_INFO = {
  tier1: {
    title: 'Tier-1 Colleges',
    description: 'Premium institutions with excellent placements',
    color: 'bg-emerald-50 dark:bg-emerald-950 border-emerald-200 dark:border-emerald-800',
    badge: 'Elite',
  },
  tier2: {
    title: 'Tier-2 Colleges',
    description: 'Strong academic reputation with good placements',
    color: 'bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800',
    badge: 'Excellent',
  },
  tier3: {
    title: 'Tier-3 Colleges',
    description: 'Solid institutions with decent placements',
    color: 'bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-800',
    badge: 'Good',
  },
  tier4: {
    title: 'Tier-4 Colleges',
    description: 'Emerging institutions with developing placements',
    color: 'bg-orange-50 dark:bg-orange-950 border-orange-200 dark:border-orange-800',
    badge: 'Developing',
  },
};

const getDefaultPrediction = (): PredictionResult => {
  const matchedColleges = colleges.filter((college) =>
    ['IIT', 'BITS'].some((name) => college.shortName.includes(name))
  );

  return {
    tier: 'tier1',
    colleges: matchedColleges.slice(0, 4),
    message: 'Sample preview of the predictor. Enter your own score or percentile to see personalized results.',
    cutoff: 245,
    isSample: true,
  };
};

export default function PredictorPage() {
  const [exam, setExam] = useState<ExamType>('jee-main');
  const [rank, setRank] = useState<string>('');
  const [percentile, setPercentile] = useState<string>('');
  const [result, setResult] = useState<PredictionResult>(getDefaultPrediction());
  const [isLoading, setIsLoading] = useState(false);

  const handlePredict = () => {
    if (!rank && !percentile) {
      alert('Please enter either rank or percentile');
      return;
    }

    setIsLoading(true);

    // Simulate API delay
    setTimeout(() => {
      let score = 0;

      if (percentile) {
        const p = parseFloat(percentile);
        const cutoff = EXAM_CUTOFFS[exam];
        score = (p / 100) * (cutoff.max - cutoff.min) + cutoff.min;
      } else {
        const r = parseInt(rank);
        // Convert rank to score (inverse relationship)
        const cutoff = EXAM_CUTOFFS[exam];
        score = cutoff.max - (r / 100000) * cutoff.max; // Rough conversion
        score = Math.max(0, score);
      }

      // Determine tier
      let tier: 'tier1' | 'tier2' | 'tier3' | 'tier4' = 'tier4';
      const categories = EXAM_CUTOFFS[exam].categories;

      if (score >= categories.tier1.min) {
        tier = 'tier1';
      } else if (score >= categories.tier2.min) {
        tier = 'tier2';
      } else if (score >= categories.tier3.min) {
        tier = 'tier3';
      } else {
        tier = 'tier4';
      }

      // Get matching colleges
      const matchedColleges = colleges.filter((college) => {
        if (tier === 'tier1') return ['IIT', 'BITS'].some((name) => college.shortName.includes(name));
        if (tier === 'tier2') return ['NIT', 'NITK', 'NITT'].some((name) => college.shortName.includes(name));
        if (tier === 'tier3') return !['IIT', 'BITS', 'NIT', 'NITK', 'NITT'].some((name) => college.shortName.includes(name)) && college.rating >= 4.3;
        return college.rating < 4.3;
      });

      setResult({
        tier,
        colleges: matchedColleges.slice(0, 4),
        message: `Based on your ${exam.replace('-', ' ').toUpperCase()} ${percentile ? 'percentile' : 'rank'}, you're eligible for ${TIER_INFO[tier].title}`,
        cutoff: score,
        isSample: false,
      });

      setIsLoading(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handlePredict();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-slide-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 mb-4 animate-slide-up">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Smart College Predictor</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Predict Your
              <span className="gradient-text"> Eligible Colleges</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Enter your exam score or percentile to discover colleges you&apos;re likely to get into
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Input Card */}
            <Card className="lg:col-span-1 animate-slide-in-left">
              <CardHeader>
                <CardTitle>Enter Your Score</CardTitle>
                <CardDescription>Select your exam and enter your performance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                {/* Exam Selection */}
                <div className="space-y-2">
                  <Label htmlFor="exam" className="text-sm font-medium">
                    Entrance Exam
                  </Label>
                  <Select value={exam} onValueChange={(value) => setExam(value as ExamType)}>
                    <SelectTrigger id="exam" className="h-10">
                      <SelectValue placeholder="Select exam" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="jee-main">JEE Main</SelectItem>
                      <SelectItem value="jee-advanced">JEE Advanced</SelectItem>
                      <SelectItem value="neet">NEET</SelectItem>
                      <SelectItem value="cat">CAT (MBA)</SelectItem>
                      <SelectItem value="gate">GATE</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Rank Input */}
                <div className="space-y-2">
                  <Label htmlFor="rank" className="text-sm font-medium">
                    Your Rank (Optional)
                  </Label>
                  <Input
                    id="rank"
                    type="number"
                    placeholder="e.g., 5000"
                    value={rank}
                    onChange={(e) => {
                      setRank(e.target.value);
                      if (e.target.value) setPercentile('');
                    }}
                    onKeyPress={handleKeyPress}
                    className="h-10"
                  />
                  <p className="text-xs text-muted-foreground">Enter your All India Rank</p>
                </div>

                {/* Percentile Input */}
                <div className="space-y-2">
                  <Label htmlFor="percentile" className="text-sm font-medium">
                    Or Your Percentile
                  </Label>
                  <Input
                    id="percentile"
                    type="number"
                    placeholder="e.g., 95"
                    value={percentile}
                    onChange={(e) => {
                      setPercentile(e.target.value);
                      if (e.target.value) setRank('');
                    }}
                    onKeyPress={handleKeyPress}
                    min="0"
                    max="100"
                    className="h-10"
                  />
                  <p className="text-xs text-muted-foreground">Enter your percentile (0-100)</p>
                </div>

                {/* Predict Button */}
                <Button
                  onClick={handlePredict}
                  disabled={isLoading || (!rank && !percentile)}
                  className="w-full gap-2 h-10"
                >
                  {isLoading ? (
                    <>
                      <span className="animate-spin">⚡</span>
                      Predicting...
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4" />
                      Predict Colleges
                    </>
                  )}
                </Button>

                {/* Info Alert */}
                <Alert className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
                  <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <AlertDescription className="text-xs text-blue-700 dark:text-blue-300 ml-2">
                    Predictions are based on historical cutoff data and may vary yearly
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            {/* Results Card */}
            <div className="lg:col-span-2 animate-slide-in-right">
              {!result ? (
                <Card className="h-full flex items-center justify-center border-dashed">
                  <div className="text-center py-12">
                    <div className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center mx-auto mb-4">
                      <TrendingUp className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">Ready to Predict?</h3>
                    <p className="text-sm text-muted-foreground max-w-xs">
                      Enter your exam details on the left to see colleges you&apos;re eligible for
                    </p>
                  </div>
                </Card>
              ) : (
                <div className="space-y-6">
                  {/* Result Header */}
                  <Card className={`border-2 ${TIER_INFO[result.tier].color}`}>
                    <CardHeader>
                      <div className="flex flex-col gap-4 sm:gap-0 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Award className="w-5 h-5 text-primary" />
                            <h3 className="font-bold text-lg">{TIER_INFO[result.tier].title}</h3>
                          </div>
                          <p className="text-sm text-muted-foreground">{result.message}</p>
                          {result.isSample && (
                            <p className="mt-2 text-xs text-muted-foreground/80 italic">
                              Sample preview shown while you enter your exam data.
                            </p>
                          )}
                        </div>
                        <Badge className="flex-shrink-0 h-fit" variant="default">
                          {result.isSample ? 'Sample' : TIER_INFO[result.tier].badge}
                        </Badge>
                      </div>
                    </CardHeader>
                  </Card>

                  {/* Matched Colleges */}
                  <div>
                    <h3 className="font-semibold text-lg mb-3">Colleges You Can Apply To</h3>
                    <div className="grid gap-3">
                      {result.colleges.length > 0 ? (
                        result.colleges.map((college, idx) => (
                          <Link key={college.id} href={`/colleges/${college.id}`}>
                            <Card className="group hover:shadow-lg hover:border-primary/50 transition-all duration-300 cursor-pointer">
                              <CardContent className="p-4">
                                <div className="flex items-start justify-between gap-4">
                                  <div className="min-w-0 flex-1">
                                    <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors duration-200">
                                      {college.shortName}
                                    </h4>
                                    <p className="text-sm text-muted-foreground">
                                      {college.location.city}, {college.location.state}
                                    </p>
                                    <div className="flex items-center gap-3 mt-2 text-xs">
                                      <span className="flex items-center gap-1">
                                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                                        {college.placements[0]?.percentage}% placed
                                      </span>
                                      <span className="text-muted-foreground">₹{college.placements[0]?.averagePackage} LPA avg</span>
                                    </div>
                                  </div>
                                  <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors duration-200 flex-shrink-0 mt-1" />
                                </div>
                              </CardContent>
                            </Card>
                          </Link>
                        ))
                      ) : (
                        <Card className="rounded-xl border border-muted/20 bg-muted/5 p-6 text-sm text-muted-foreground">
                          No matching colleges found for this score. Try a different exam or score.
                        </Card>
                      )}
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="bg-gradient-to-r from-primary/5 to-chart-4/5 p-4 rounded-lg border border-primary/10">
                    <p className="text-sm text-muted-foreground mb-3">
                      Want to compare your eligible colleges?
                    </p>
                    <Link href="/compare">
                      <Button variant="default" className="gap-2 w-full sm:w-auto">
                        <span>Go to Compare</span>
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* How It Works Section */}
          <Card className="bg-gradient-to-br from-muted/50 to-muted/30 border-dashed mt-12">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-primary" />
                How It Works
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    step: '1',
                    title: 'Select Your Exam',
                    description: 'Choose from JEE, NEET, CAT, GATE, or other entrance exams',
                  },
                  {
                    step: '2',
                    title: 'Enter Your Score',
                    description: 'Provide your rank or percentile to get personalized predictions',
                  },
                  {
                    step: '3',
                    title: 'Discover Colleges',
                    description: 'See all colleges you are likely to get admitted to',
                  },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0 text-sm">
                      {item.step}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground mb-1">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
