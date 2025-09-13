import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
export const CommissionForm = () => {
  const {
    toast
  } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    budget: '',
    deadline: '',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) return; // Prevent double submissions
    
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // TODO: Replace with your Formspree endpoint
      const response = await fetch('https://formspree.io/f/your_form_id', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          service: formData.service,
          budget: formData.budget,
          notes: formData.notes,
          _replyto: formData.email
        })
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          service: '',
          budget: '',
          deadline: '',
          notes: ''
        });
        toast({
          title: "Mission Received!",
          description: "We'll get back to you within 24 hours to discuss your project."
        });
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      setSubmitStatus('error');
      toast({
        title: "Submission Error",
        description: "Please try again or contact us directly.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleClear = () => {
    setFormData({
      name: '',
      email: '',
      service: '',
      budget: '',
      deadline: '',
      notes: ''
    });
  };
  return <section id="order" className="content-layer py-20 px-6 lg:px-12 relative overflow-hidden">
      {/* Firestorm background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-40 h-40 bg-firestorm-red/10 rounded-full blur-3xl animate-fire-flicker"></div>
        <div className="absolute bottom-1/3 right-1/4 w-32 h-32 bg-firestorm-orange/8 rounded-full blur-2xl animate-fire-flicker" style={{
        animationDelay: '3s'
      }}></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl lg:text-6xl font-black text-foreground mb-4">
            COMMISSION <span className="text-firestorm-red">YOUR EDIT</span>
          </h2>
          <p className="text-muted-foreground font-heading text-lg">
            Ready to bring your vision to life? Let's create something legendary together.
          </p>
        </div>

        <Card className="bg-card/90 backdrop-blur-sm border-border shadow-xl hover:shadow-2xl transition-all duration-500">
          <CardHeader>
            <CardTitle className="font-heading text-2xl text-center text-foreground">Mission Brief</CardTitle>
          </CardHeader>
          <CardContent>
            {/* TODO: Replace with your Formspree endpoint: https://formspree.io/f/your_form_id 
                Formspree file uploads require a paid plan. For file attachments, consider serverless functions + cloud storage. */}
            <form 
              id="commissionForm" 
              onSubmit={handleSubmit} 
              className="space-y-6"
            >
              {/* Honeypot field for spam prevention */}
              <input 
                type="text" 
                name="_gotcha" 
                style={{ display: 'none' }} 
                tabIndex={-1} 
                autoComplete="off" 
              />
              {/* Optional redirect after successful submission */}
              {/* <input type="hidden" name="_next" value="https://your-site.com/thank-you.html" /> */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name" className="font-heading font-bold text-foreground">Your Name</Label>
                  <Input 
                    id="name" 
                    name="name"
                    value={formData.name} 
                    onChange={e => setFormData({
                      ...formData,
                      name: e.target.value
                    })} 
                    className="bg-background border-border focus:border-firestorm-red" 
                    required 
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="font-heading font-bold text-foreground">Email</Label>
                  <Input 
                    id="email" 
                    name="email"
                    type="email" 
                    value={formData.email} 
                    onChange={e => setFormData({
                      ...formData,
                      email: e.target.value
                    })} 
                    className="bg-background border-border focus:border-firestorm-red" 
                    required 
                  />
                  <input type="hidden" name="_replyto" value={formData.email} />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="service" className="font-heading font-bold text-foreground">Service Type</Label>
                  <Select 
                    name="service"
                    value={formData.service} 
                    onValueChange={value => setFormData({
                      ...formData,
                      service: value
                    })}
                  >
                    <SelectTrigger className="bg-background border-border focus:border-firestorm-red">
                      <SelectValue placeholder="Select service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="trailer">Movie Trailer Edit</SelectItem>
                      <SelectItem value="social">Social Media Reel</SelectItem>
                      <SelectItem value="celebrity">Celebrity Cut</SelectItem>
                      <SelectItem value="commercial">Commercial/Brand</SelectItem>
                      <SelectItem value="music">Music Video</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="budget" className="font-heading font-bold text-foreground">Budget Range</Label>
                  <Select value={formData.budget} onValueChange={value => setFormData({
                  ...formData,
                  budget: value
                })}>
                    <SelectTrigger className="bg-background border-border focus:border-firestorm-red">
                      <SelectValue placeholder="Select budget" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="500-1000">₹500 - ₹1,000</SelectItem>
                      <SelectItem value="1000-2500">₹1,000 - ₹2,500</SelectItem>
                      <SelectItem value="2500-5000">₹2,500 - ₹5,000</SelectItem>
                      <SelectItem value="5000+">₹5,000+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              

                <div>
                <Label htmlFor="notes" className="font-heading font-bold text-foreground">Project Details</Label>
                <Textarea 
                  id="notes" 
                  name="notes"
                  value={formData.notes} 
                  onChange={e => setFormData({
                    ...formData,
                    notes: e.target.value
                  })} 
                  placeholder="Tell us about your vision, style preferences, target audience, and any specific requirements..." 
                  className="bg-background border-border focus:border-firestorm-red min-h-32" 
                  required 
                />
              </div>

              {/* Success/Error Messages */}
              {submitStatus === 'success' && (
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 text-green-400" role="alert" aria-live="polite">
                  <strong>Success!</strong> Your mission brief has been received. We'll get back to you within 24 hours.
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 text-red-400" role="alert" aria-live="polite">
                  <strong>Error:</strong> There was a problem submitting your form. Please try again or contact us directly.
                </div>
              )}

              <div className="flex gap-4">
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="flex-1 bg-firestorm-red hover:bg-firestorm-red/90 text-white font-heading font-bold py-3 text-lg shadow-ember disabled:opacity-50"
                  aria-label="Submit commission form"
                >
                  {isSubmitting ? 'LAUNCHING...' : 'LAUNCH MISSION'}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={handleClear} 
                  disabled={isSubmitting}
                  className="border-border hover:bg-accent text-foreground font-heading font-bold disabled:opacity-50"
                  aria-label="Clear form"
                >
                  CLEAR
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>;
};