-- Create Categories
INSERT INTO categories (Title) VALUES
  ('Sports'),
  ('Politics'),
  ('Technology'),
  ('Entertainment');

-- Create Tags
INSERT INTO tags (Title) VALUES
  ('Football'),
  ('Basketball'),
  ('Soccer'),
  ('News'),
  ('Gaming'),
  ('Movies');

-- Create Articles
INSERT INTO articles (PublishDate, Title, Reporter, Body, CategoryID)
VALUES
  ('2023-06-01', 'Exciting Football Match Ends in Draw', 'John Smith', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 1),
  ('2023-06-02', 'New Government Policies Announced', 'Jane Doe', 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem.', 2),
  ('2023-06-03', 'Latest Smartphone Launched with Advanced Features', 'John Smith', 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur.', 3),
  ('2023-06-04', 'Hollywood Star Wins Best Actor Award', 'Jane Doe', 'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.', 4);

-- Assign Tags to Articles
INSERT INTO article_tags (ArticleID, TagID) VALUES
  (1, 1),
  (1, 3),
  (2, 4),
  (3, 6),
  (4, 5);
