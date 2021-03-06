import BlogLogo from "../components/BlogLogo/BlogLogo";
import Drawer from "../layouts/Drawer/Drawer";
import Footer from "../components/Footer/Footer";
import Helmet from "react-helmet";
import { Link } from "react-scroll";
import MainHeader from "../layouts/MainHeader/MainHeader";
import MainNav from "../layouts/MainNav/MainNav";
import MenuButton from "../components/MenuButton/MenuButton";
import Navigation from "../components/Navigation/Navigation";
import PageDescription from "../components/PageDescription/PageDescription";
import PageTitle from "../components/PageTitle/PageTitle";
import PaginatedContent from "../layouts/PaginatedContent/PaginatedContent";
import PostListing from "../components/PostListing/PostListing";
import React from "react";
import SEO from "../components/SEO/SEO";
import SiteWrapper from "../layouts/SiteWrapper/SiteWrapper";
import SocialMediaIcons from "../components/SocialMediaIcons/SocialMediaIcons";
import config from "../../data/SiteConfig";

class IndexTemplate extends React.Component {
  state = {
    menuOpen: false
  };

  handleOnClick = evt => {
    evt.stopPropagation();
    if (this.state.menuOpen) {
      this.closeMenu();
    } else {
      this.openMenu();
    }
  };

  handleOnClose = evt => {
    evt.stopPropagation();
    this.closeMenu();
  };

  openMenu = () => {
    this.setState({ menuOpen: true });
  };

  closeMenu = () => {
    this.setState({ menuOpen: false });
  };

  renderHeader = () => (
    <MainHeader cover={config.siteCover}>
      <MainNav overlay={config.siteCover}>
        <BlogLogo logo={config.siteLogo} title={config.siteTitle} />
        <MenuButton
          navigation={config.siteNavigation}
          onClick={this.handleOnClick}
        />
      </MainNav>
      <div className="vertical">
        <div className="main-header-content inner">
          <PageTitle text={config.siteTitle} />
          <PageDescription text={config.siteDescription} />
          <SocialMediaIcons
            urls={config.siteSocialUrls}
            color="currentColor"
          />
        </div>
      </div>
      <Link
        className="scroll-down icon-arrow-left"
        to="content"
        data-offset="-45"
        spy
        smooth
        duration={500}
      >
        <span className="hidden">Scroll Down</span>
      </Link>
    </MainHeader>
  )
    
  

  render() {
    const {
      nodes,
      page,
      pages,
      total,
      limit,
      prev,
      next
    } = this.props.pathContext;
    const authorsEdges = this.props.data.authors.edges;
    console.log(nodes);
    
    return (
      <Drawer className="home-template" isOpen={this.state.menuOpen}>
        <Helmet title={config.siteTitle} />
        <SEO postEdges={nodes} />

        {/* The blog navigation links */}
        <Navigation config={config} onClose={this.handleOnClose} />

        <SiteWrapper>
          {/* All the main content gets inserted here */}
          <div className="home-template">
            {/* The big featured header */}
            {this.renderHeader()}
            <PaginatedContent
              page={page}
              pages={pages}
              total={total}
              limit={limit}
              prev={prev}
              next={next}
            >
              {/* PostListing component renders all the posts */}
              <PostListing postEdges={nodes} postAuthors={authorsEdges} />
            </PaginatedContent>
          </div>

          {/* The tiny footer at the very bottom */}
          <Footer
            copyright={config.copyright}
            promoteGatsby={config.promoteGatsby}
          />
        </SiteWrapper>
      </Drawer>
    );
  }
}

/* eslint no-undef: "off" */
export const pageQuery = graphql`
  query IndexQuery {
    # posts data comes from the context
    # authors
    authors: allAuthorsJson {
      edges {
        node {
          id
          name
          image
          url
          bio
        }
      }
    }
  }
`;

export default IndexTemplate;
