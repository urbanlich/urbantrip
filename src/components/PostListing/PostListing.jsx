import "./PostListing.css";

import AuthorLink from "../AuthorLink/AuthorLink";
import AuthorModel from "../../models/author-model";
import AuthorThumbnail from "../AuthorThumbnail/AuthorThumbnail";
import Link from "gatsby-link";
import PostDate from "../PostDate/PostDate";
import PostFormatting from "../../layouts/PostFormatting/PostFormatting";
import PostHeader from "../../layouts/PostHeader/PostHeader";
import PostTags from "../PostTags/PostTags";
import React from "react";
import SiteConfig from "../../../data/SiteConfig";

const getPostList = (postEdges, authorEdges) =>
  postEdges.map(postEdge => ({
    path: postEdge.node.fields.slug,
    tags: postEdge.node.frontmatter.tags,
    cover: postEdge.node.frontmatter.cover,
    title: postEdge.node.frontmatter.title,
    date: postEdge.node.frontmatter.date,
    author: AuthorModel.getAuthor(
      authorEdges,
      postEdge.node.frontmatter.author,
      SiteConfig.blogAuthorId
    ),
    excerpt: postEdge.node.excerpt.replace(/<[^*]*>/gm, ''),
    timeToRead: postEdge.node.timeToRead
  }));

class PostListing extends React.Component {
  render() {
    const postList = getPostList(this.props.postEdges, this.props.postAuthors);

    return (
      <div>
        {/* This is the post loop - each post will be output using this markup */}
        {postList.map(post => {
          const { title, path, excerpt, author, tags, date } = post;
          const className = post.post_class ? post.post_class : "post";
          const parsedExcerpt = excerpt.replace(/\\n/g, '');
          return (
            <PostFormatting className={className} key={title}>
              <PostHeader>
                <h2 className="post-title">
                  <Link to={path}>{title}</Link>
                </h2>
              </PostHeader>
              <section className="post-excerpt">
                {/* TODO limit excerpt to 26 words */}
                <p>
                  {parsedExcerpt}{" "}
                  <Link className="read-more" to={path}>
                    &raquo;
                  </Link>
                </p>
              </section>
              <footer className="post-meta">
                <AuthorThumbnail avatar={author.image} name={author.name} />
                <div className="post-meta-info">
                  <AuthorLink url={`/author/${author.id}`} name={author.name} />
                  <PostTags prefix=" on " tags={tags} />
                  <PostDate date={date} />
                </div>
              </footer>
            </PostFormatting>
          );
        })}
      </div>
    );
  }
}

export default PostListing;
