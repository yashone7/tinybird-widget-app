# Tinybird widget assignment

Hey, Hi My Name is Yashwanth and here I will walk you through my design decisions as to how I approached the project.

## Initial thought process...

As I went through the assignment, I understood the power of tinybird, A brilliant yet simple data platform for real-time analytics
that too with RAW SQL!

I went ahead and played around with the data and I realized that we could tell a powerful story with this data.
I would say that the learnings from my product management diploma helped me. Businees runs strategy and strategy insight along with data;
and with tools like tiny bird around it helps the product managers to make the right decisions to build better products.

Now coming to the assignment part, there were several things that could be done with the data, as you can see I have tested different queries
to see what sort insights could be derrived with the data available. So I came up with some of the following.

- revenue vs trips chart
- total revenue in a particular month
- total number of passengers hailed.
- top N busiest routes etc.

Had there been location data like lat/log in GeoJSON format we could have rendered a beautiful map based visualizations with Uber's visualization
suite called deck.gl which I have previously worked on.

I love data visualization firstly it is fun to work on with and secondly it gives us quick and meaningful insights.

## Technical details

- I went ahead with react with vite, and I have chosen typescript as my language because, you know, static type checking has its benefits.
  Although my initial inclination was to go with JavaScript, I decided against it.

- Since the assignment specifically mentioned that the widgets should be sharable, I decided that SWR would be very nice approach to data fetching needs.
  While redux is good, it is 2024, and I'm just building a small widget app, there is no need for ceremony. Even I were to build a large scale application,
  unless there is a project constraint, I would prefer going with zustand for state management; it is cute and simple.

- React router v6 has considerable changes in its paradigm, particularly the fetch while loading (loaders) concept is worthwhile to look at. I found it
  interesting worth spending some time to learn the paradigm.

- Shadcn/ui for ui, beautifully crafted components, other viable alernatives I considered are Chakra-ui, it is a great library. But the beauty of drop in components like shadcn ui is that they are less prone to version breakages and deprications. I have faced the horror of migrating mui v4 to v6 and I ultimately had to drop it because it did not bring any business value. Even so good UI is what customers get attracted to and great UX is what keeps them.

- Recharts for charting, beautiful charts especially when paired with shadcn charts, which released jsut 3 days ago though! But its a little tedious to test especially with limitations to jsdom.

- Msw and react-testing-library for testing. Good libraries they focus on web standards which I feel I need to pick up.

- utils like date-fns and lodash

- .env has token, which has to be handled properly. Ideally If we're building a user facing SPA, we could write a small serverless function to invoke tinybird and store these sensitive keys over there, Cloudflare workers, vercel functions etc.

- I have committed .env file in the git repo, it is a bad practice but for the purpose of this demo I did it.

## Installation

Please refer installation.md for guidelines

## What widget is this?

I have built a simple chart which allows users to see day-wise revenue and trip count. It is a bar chart. And you can select the calendar component
to select the dates. Additionally you can also click the copy link to clipboard button to share the url and let others see the app as well.
URL parameters can be adjusted to see additional data. Please play around and let me know.

## Final thoughts

I have spent some time to built the widget, and so far I liked building application with tinybird API, I would love to dig deeper into the product to become a better software engineer. Please do provide feedback for the app I have developed. You can contact me here
