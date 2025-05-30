import React from "react";
import {
  FooterContainer,
  LeftContainer,
  RightContainer,
  FooterSection,
  SectionTitle,
  ContactInfo,
  Phone,
  LinkList,
  NewsletterInput,
  Maildescription,
  SubscribeButton,
  BottomBar,
  BottomLinks,
  Copyright
} from "./Footer.styles";
import { MdPhone } from "react-icons/md";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router-dom";


export default function Footer() {
  return (
    <FooterContainer>
        <div className="maincontainer">
        <LeftContainer>
      <FooterSection>
        <SectionTitle>Contact Us</SectionTitle>
        <ContactInfo>
          hello@mankavit.com <br />
          Address: [Insert Academy Address Here]
        </ContactInfo>
        <Phone><a href="tel:+02 5421234560"><MdPhone className="phoneicon"/> +02 5421234560</a></Phone>
        <Phone><a href="tel:+02 5421234560"><MdPhone className="phoneicon"/> +02 5421234560</a></Phone>
      </FooterSection>

      <FooterSection>
        <SectionTitle>Quick Link</SectionTitle>
        <LinkList>
          <li><Link to="/login"> Student Portal </Link></li>
          <li><Link to="/ourcourses"> Courses </Link></li>
           <li><Link to="/aboutus"> About </Link></li>
          <li><Link to="/userblog"> Blog </Link></li>
        </LinkList>
      </FooterSection>
      </LeftContainer>

      <RightContainer>
      <FooterSection>
        <SectionTitle>Studying with Us</SectionTitle>
        <LinkList>
          <li>All Courses</li>
          <li>FAQ</li>
        </LinkList>
      </FooterSection>

      <FooterSection>
        <SectionTitle>Newsletter</SectionTitle>
        <Maildescription>Subscribe our newsletter to get updated the latest news</Maildescription>
        <NewsletterInput type="email" placeholder="Enter Mail" /> <br/>
        <SubscribeButton>
          SUBSCRIBE <FaArrowRightLong className="rightarrow"/>
        </SubscribeButton>
      </FooterSection>
      </RightContainer>
      </div>

      <BottomBar>
        <Copyright>
          Copyright © 2024 Mankavit, All rights reserved.
        </Copyright>
        <BottomLinks>
          <span>Terms of service</span>
          <span>Privacy policy</span>
          <span>cookies</span>
        </BottomLinks>
      </BottomBar>
    </FooterContainer>
  );
}
