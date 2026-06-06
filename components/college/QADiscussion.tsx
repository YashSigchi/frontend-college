'use client';

import { useState } from 'react';
import { MessageSquare, Plus, ThumbsUp, Reply, Search, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';

interface Question {
  id: string;
  title: string;
  description: string;
  author: string;
  avatar: string;
  timestamp: string;
  upvotes: number;
  answers: number;
  tags: string[];
}

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  votes: number;
}

const sampleQuestions: Question[] = [
  {
    id: '1',
    title: 'What is the average placement percentage?',
    description: 'I want to know about the placement statistics for the recent batch',
    author: 'Rajesh Kumar',
    avatar: 'RK',
    timestamp: '2 days ago',
    upvotes: 24,
    answers: 5,
    tags: ['placements', 'statistics'],
  },
  {
    id: '2',
    title: 'How are the hostel facilities?',
    description: 'Looking for information about hostel infrastructure and food quality',
    author: 'Priya Singh',
    avatar: 'PS',
    timestamp: '1 week ago',
    upvotes: 18,
    answers: 8,
    tags: ['hostel', 'campus-life'],
  },
  {
    id: '3',
    title: 'Is there a cutoff for different categories?',
    description: 'Want to understand cutoff marks for SC/ST/OBC categories',
    author: 'Amit Patel',
    avatar: 'AP',
    timestamp: '3 days ago',
    upvotes: 15,
    answers: 3,
    tags: ['admission', 'cutoff'],
  },
];

const frequentlyAsked: FAQItem[] = [
  {
    id: 'faq1',
    question: 'What are the eligibility criteria for admission?',
    answer: 'Students must qualify in JEE Advanced for B.Tech programs, with a minimum score in the qualifying examination. Specific cutoff marks vary by category and field of study.',
    votes: 245,
  },
  {
    id: 'faq2',
    question: 'Are international students admitted?',
    answer: 'Yes, international students can apply through the International Admissions process. They need to provide equivalent qualifications and may be eligible for specific quotas.',
    votes: 189,
  },
  {
    id: 'faq3',
    question: 'What is the scholarship policy?',
    answer: 'The institution offers merit-based scholarships to deserving students. Additionally, there are provisions for need-based financial aid and government scholarships.',
    votes: 156,
  },
];

interface QADiscussionProps {
  collegeName: string;
}

export function QADiscussion({ collegeName }: QADiscussionProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewQuestion, setShowNewQuestion] = useState(false);
  const [activeTab, setActiveTab] = useState<'questions' | 'faq'>('questions');
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
  const [questions, setQuestions] = useState<Question[]>(sampleQuestions);
  const [newQuestionTitle, setNewQuestionTitle] = useState('');
  const [newQuestionDescription, setNewQuestionDescription] = useState('');

  const filteredQuestions = questions.filter(
    (q) =>
      q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-primary" />
            </div>
            Q&A Discussion
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Ask questions and get answers from the community
          </p>
        </div>
        <Button
          onClick={() => setShowNewQuestion(!showNewQuestion)}
          className="gap-2"
        >
          <Plus className="w-4 h-4" />
          Ask Question
        </Button>
      </div>

      {/* New Question Form */}
      {showNewQuestion && (
        <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
          <CardContent className="p-6 space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Question Title</label>
              <Input
                value={newQuestionTitle}
                onChange={(e) => setNewQuestionTitle(e.target.value)}
                placeholder="What would you like to know about this college?"
                className="h-10"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Details (Optional)</label>
              <Textarea
                value={newQuestionDescription}
                onChange={(e) => setNewQuestionDescription(e.target.value)}
                placeholder="Provide more context about your question..."
                className="min-h-[100px] resize-none"
              />
            </div>
            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                onClick={() => {
                  setShowNewQuestion(false);
                  setNewQuestionTitle('');
                  setNewQuestionDescription('');
                }}
              >
                Cancel
              </Button>
              <Button
                className="gap-2"
                onClick={() => {
                  if (!newQuestionTitle.trim()) return;
                  const newQuestion: Question = {
                    id: Date.now().toString(),
                    title: newQuestionTitle.trim(),
                    description: newQuestionDescription.trim() || 'No additional details provided.',
                    author: 'You',
                    avatar: 'You',
                    timestamp: 'Just now',
                    upvotes: 0,
                    answers: 0,
                    tags: ['community'],
                  };
                  setQuestions((prev) => [newQuestion, ...prev]);
                  setShowNewQuestion(false);
                  setNewQuestionTitle('');
                  setNewQuestionDescription('');
                  setActiveTab('questions');
                }}
              >
                <Zap className="w-4 h-4" />
                Post Question
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tabs */}
      <div className="flex gap-2 border-b">
        <button
          onClick={() => setActiveTab('questions')}
          className={`px-4 py-2.5 font-medium text-sm border-b-2 transition-all duration-200 ${
            activeTab === 'questions'
              ? 'border-primary text-primary'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          <span className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            Recent Questions ({questions.length})
          </span>
        </button>
        <button
          onClick={() => setActiveTab('faq')}
          className={`px-4 py-2.5 font-medium text-sm border-b-2 transition-all duration-200 ${
            activeTab === 'faq'
              ? 'border-primary text-primary'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          }`}
        >
          <span className="flex items-center gap-2">
            <Zap className="w-4 h-4" />
            FAQ
          </span>
        </button>
      </div>

      {/* Questions Tab */}
      {activeTab === 'questions' && (
        <div className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-10"
            />
          </div>

          {/* Questions List */}
          {filteredQuestions.length > 0 ? (
            <div className="space-y-3">
              {filteredQuestions.map((question, idx) => (
                <Card
                  key={question.id}
                  className="hover:shadow-md hover:border-primary/50 transition-all duration-300 cursor-pointer group animate-reveal"
                  style={{ animationDelay: `${idx * 0.05}s` }}
                >
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors duration-200 line-clamp-2">
                            {question.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                            {question.description}
                          </p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="text-lg font-bold text-primary">{question.upvotes}</p>
                          <p className="text-xs text-muted-foreground">votes</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-xs">
                              {question.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <div className="text-xs text-muted-foreground">
                            <p className="font-medium text-foreground">{question.author}</p>
                            <p>{question.timestamp}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1 hover:text-primary transition-colors">
                            <Reply className="w-3.5 h-3.5" />
                            {question.answers}
                          </span>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex gap-2 pt-2 flex-wrap">
                        {question.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="text-xs font-normal hover:bg-primary/10 transition-colors duration-200"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <MessageSquare className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground">No questions found matching your search</p>
            </div>
          )}
        </div>
      )}

      {/* FAQ Tab */}
      {activeTab === 'faq' && (
        <div className="space-y-3">
          {frequentlyAsked.map((faq, idx) => (
            <Card
              key={faq.id}
              className="hover:shadow-md transition-all duration-300 animate-reveal"
              style={{ animationDelay: `${idx * 0.05}s` }}
            >
              <button
                onClick={() =>
                  setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)
                }
                className="w-full p-4 text-left hover:bg-muted/30 transition-colors duration-200"
              >
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-semibold text-foreground flex-1">
                    {faq.question}
                  </h3>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <ThumbsUp className="w-3.5 h-3.5" />
                      {faq.votes}
                    </span>
                    <svg
                      className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${
                        expandedFAQ === faq.id ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                      />
                    </svg>
                  </div>
                </div>
              </button>

              {expandedFAQ === faq.id && (
                <div className="px-4 py-4 border-t bg-muted/20 animate-slide-up">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
