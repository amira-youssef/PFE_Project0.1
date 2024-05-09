import React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const testimonials = [
  {
    id: 1,
    author: 'John Doe',
    comment: 'Excellent service! The car was clean and well-maintained.',
  },
  {
    id: 2,
    author: 'Jane Smith',
    comment: 'Easy booking process and friendly staff. Will rent again!',
  },
  // Add more testimonials as needed
];

const Testimonials = () => {
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Testimonials
      </Typography>
      <Grid container spacing={3}>
        {testimonials.map(testimonial => (
          <Grid item xs={12} sm={6} key={testimonial.id}>
            <Card>
              <CardContent>
                <Typography variant="body1" gutterBottom>
                  "{testimonial.comment}"
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  - {testimonial.author}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Testimonials;
