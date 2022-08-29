

import React,{useState} from 'react';
import WebBase from "./WebLayout/WebBase";
import ApplyNow from './HomeChunks/ApplyNow';

const Career = () => {

    const [state, setState] = useState({
        isShowApplyNowModal: false,
        jobTitle: "",
    });

    const handleShowApplyNow = (show = false, jobTitle = "") => {
        show = typeof show === "boolean" && show;
        setState({
            isShowApplyNowModal: show,
            jobTitle: jobTitle,
        });
        // setShowApplyNow(!ShowApplyNow)
    }

    let { isShowApplyNowModal, jobTitle } = state;

    return (
        <>
            <WebBase>
                <section className="career-pg">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <h2 className=" pt-5 font-size-24">
                                Business Development Manager
                                <span className="apply-now-link" onClick={() => handleShowApplyNow(true, "Business Development Manager")}>Apply Now</span>
                                </h2>
                                <p>
                                <strong>Experience:</strong>  10 years
                                </p>
                                <p>
                                <strong>Location:</strong> Indore
                                </p>
                                <p>
                                <strong>Remuneration :</strong> purely based on experience
                                </p>
                                <h5>
                                6 days Working
                                </h5>
                                <h4>Mandatory sales exp of 1+ years in logistics companies like Delhivery, FedEx, Ecom Express, Xpressbees, Pickrr, Shiprocket, Shyplite, Nimbus Post. </h4>
                                <h3 className="font-size-20 pb-3 pt-3">
                                Responsibilities :
                                </h3>
                                <ul>
                                    <li>Be the face of the company for prospective clients </li>
                                    <li>Generate and convert leads to grow Yolojet's business in India </li>
                                    <li>Maintain a healthy pipeline of customers/accounts</li>
                                    <li>Report weekly activities and monthly achievements to the line manager</li>
                                    <li>Develop new ideas/strategies to showcase Yolojet's capabilities across the Ecommerce industry </li>
                                    <li>Focusing on sales efforts by studying existing and potential volume of clients</li>
                                    <li>Keeping management informed by submitting activity and results, daily call reports, weekly work plans, and monthly and annual territory analysis  </li>
                                    <li>Monitoring current marketplace pricing, products, new products, and delivery schedules  </li>
                                    <li>Recommending changes in products, service, and policy by evaluating results and competitive developments  </li>
                                    <li>Resolving customer grievances by investigating problems; developing solutions; preparing reports; making recommendations to management</li>
                                </ul>
                            </div>
                            <div className="col-lg-12">
                                <h2 className=" pt-5 font-size-24">
                                Content Writer
                                <span className="apply-now-link" onClick={() => handleShowApplyNow(true, "Content Writer")}>Apply Now</span>
                                </h2>
                                <p>
                                <strong>Experience:</strong>  1-3 yrs
                                </p>
                                <p>
                                <strong>Location:</strong> Indore
                                </p>
                                <p>
                                <strong>Remuneration :</strong> No restrains for the right candidate
                                </p>

                                <h3 className="font-size-20 pb-3 pt-3">
                                Description :
                                </h3>
                                <ul>
                                    <li>Creating content for blogs, product descriptions, social media, and the company website.   </li>
                                    <li>Evaluating keyword analytics and research to adjust content as needed.   </li>
                                    <li>Following editorial guidelines when creating content.   </li>
                                    <li>Proofreading content for errors and inconsistencies. Editing and polishing existing content to improve readability.   </li>
                                    <li>Produce quality content quickly and efficiently.   </li>
                                    <li>Write or develop highly professional, unique, and corporate content for websites / web pages from scratch.   </li>
                                    <li>Write web content, press releases, blog articles, social network sites -LinkedIn, Twitter, Facebook, StumbleUpon, Delicious, Digg etc.   </li>
                                    <li>Write engaging website copies, understandable by the target audience, and drive them to take action on the page.   </li>
                                    <li>Identify new content generation ideas and distribution channels.   </li>
                                    <li>Driving growth through actionable content   </li>
                                    <li>Write creative edits/copies for emails, SMS, and push notifications.   </li>
                                    </ul>
                                    <h3 className="font-size-20 pb-3 pt-3">
                                     Requirements :
                                    </h3>
                                    <ul>
                                        <li>Must have 1-3 years of experience in content marketing   </li>
                                        <li>Should be well-versed in marketing, brand communications, SEO content   </li>
                                        <li>Should have the ability to work with minimal supervision, be proactive and self-motivated   </li>
                                        <li>Proven Experience in creative writing</li>
                                    </ul>
                            </div>

                            <div className="col-lg-12">
                                <h2 className=" pt-5 font-size-24">
                                React Native Developer
                                <span className="apply-now-link" onClick={() => handleShowApplyNow(true, "React Native Developer")}>Apply Now</span>
                                </h2>
                                <h3 className="font-size-20 pb-3 pt-3">
                                Job description :
                                </h3>
                                <ul>
                                    <li>2 to 7 years of professional experience as hands-on Front End Engineer on Android/iOS.</li>
                                    <li>Expert in Android/iOS Mobile App Development with React Native technologies.</li>
                                    <li>3 years of experience in JavaScript and React Native/Redux.</li>
                                    <li>Familiarity with OOP design principles.</li>
                                    <li>Experience with REACT.</li>
                                    <li>Experience with HTML / CSS.</li>
                                    <li>Experience with REST API's Experience with third-party libraries and APIs.</li>
                                    <li>Superior analytical skills with a good problem-solving attitude.</li>
                                    <li>Ability to perform in a team environment.</li>
                                    <li>Strong oral and written communication skills.</li>
                                    <li>Understanding of CI/CD , Unit testing and deterministic functional testing, End to End automation.</li>
                                    <li>Develop a flexible and well-structured front-end architecture, along with the APIs to support it.</li>
                                </ul>
                                <h3 className="font-size-20 pb-3 pt-3">
                                Roles and Responsibilities :
                                </h3>
                                <ul>
                                    <li>Develop React Native applications for both iOS and Android</li>
                                    <li>Build reusable components and front-end libraries for future use</li>
                                    <li>Leverage native APIs for deep integrations with both platforms.</li>
                                    <li>Create UI Screen and Modules in both iOS and Android and integrate with React Native application</li>
                                    <li>Diagnose and fix bugs and performance bottlenecks for performance that feels native.</li>
                                    <li>Create software code, unit tests and assist with encoding, testing, debugging, and documentation.</li>
                                    <li>Review client requirements, wireframes, and designs for technical feasibility, work with the scrum team to translate these into user stories that can be implemented</li>
                                    <li>Improve product quality through code reviews, writing effective unit tests, and collaborating with QA to implement automation testing where appropriate</li>
                                    </ul>
                                    <h3 className="font-size-20 pb-3 pt-3">
                                    Required Candidate profile :
                                    </h3>
                                    <ul>
                                    <li>4 to 12 years of total experience in application development.</li>
                                    <li>Minimum 3 year relevant and real time experience in ReactNative.</li>
                                    <li>Strong JavaScript fundamentals and ES6 knowledge, ReactNative / NodeJS, MVC, Design Patterns, REST APIs, Swagger, AWS and GAE</li>
                                    <li>Familiarity with state/data management libraries (Redux, Mobx)</li>
                                    <li>Strong debugging skills with the ability to reach out and work with peers to solve complex problems</li>
                                    <li>Familiarity with code versioning tools such as Git</li>
                                    <li>Knowledge of general mobile landscape, architectures, trends, and emerging technologies.</li>
                                    <li>Experience in automated testing suites, like Jest/ Mocha/ Express is a plus.</li>
                                    <li>Experience with Agile Development mythology.</li>
                                    <li>Candidate should have strong communication skills, should be able to work independently &amp; provide guidance to junior members.</li>
                                    </ul>
                                    <h3 className="font-size-20 pb-3 pt-3">
                                    Position details:
                                    </h3>
                                    <ul>
                                    <li>Role : Software Developer </li>
                                    <li>Industry Type : IT-Software Software Services</li>
                                    <li>Functional Area: IT Software - Application Programming, Maintenance</li>
                                    <li>Employment Type: Full Time</li>
                                    <li>Role Category: Programming &amp; Design</li>
                                    <li>Education</li>
                                    <li>UG :B.Tech/B.E. in Any Specialization</li>
                                    </ul>
                                </div>
                            <div className="col-lg-12">
                                <h2 className=" pt-5 font-size-24">
                                Outbound Sales Specialist
                                <span className="apply-now-link" onClick={() => handleShowApplyNow(true, "Outbound Sales Specialist")}>Apply Now</span>
                                </h2>
                                <p>
                                <strong>Experience :</strong>   1-4 yrs
                                </p>
                                <p>
                                <strong>Job Location :</strong> Indore
                                </p>
                                <h3 className="font-size-20 pb-3 pt-3">
                                Specific responsibilities include the following :
                            </h3>
                            <ul>
                                <li>Identifying new business opportunities by analyzing the market &amp; getting clients on board   </li>
                                <li>Set up the business unit's strategies to generate leads, in various industry verticals and explore possible business opportunities   </li>
                                <li>Make cold calls/ references/sales meetings and other forms of lead generation to identify business opportunities for the Company   </li>
                                <li>Design and implement a strategic business plan that expands company's customer base and ensure its strong presence in your designated region   </li>
                                <li>Closing the business and generating revenue, tweaking of sales pitch, whenever required   </li>
                                <li>Report Generation after analyzing monthly/quarterly sales target   </li>
                                <li>Maintain communication and relationships with the potential customer and constant follow up with regards to other business opportunities. Develop and maintain client relationships by developing effective ways   </li>
                                <li>Meet with clients to discuss their evolving needs and to assess the quality of our company's relationship with them   </li>
                                <li>Identify emerging markets and market shifts while being fully aware of competition status   </li>
                                <li>Contribute to the planning, management and development of the Company</li>
                                </ul>
                            </div>
                            <div className="col-lg-12">
                                <h2 className=" pt-5 font-size-24">
                                Associate - Customer Support
                                <span className="apply-now-link" onClick={() => handleShowApplyNow(true, "Associate - Customer Support")}>Apply Now</span>
                                </h2>
                                <p>
                                <strong>Experience :</strong> 1-2 yrs
                                </p>
                                <p>
                                <strong>Job Location  :</strong> Indore
                                </p>
                                <p>
                                <strong>Remuneration :</strong> Best for the Right Fit.
                                </p>
                                <h4>Immediate Joiners</h4>
                                <h3 className="font-size-20 pb-3 pt-3">
                                Responsibilities :
                                </h3>
                                <ul>
                                    <li>Answer customer support queries in a friendly, professional and timely manner via mail and calls   </li>
                                    <li>Responding to user questions on our discussion forums   </li>
                                    <li>Reducing common customer queries   </li>
                                    <li>Working closely with our operations team to help resolve customer issues   </li>
                                    <li>Share feedback and insights with the operations and delivery team   Requirements :   </li>
                                    <li>At least 6 month or one year Experience of Customer support   </li>
                                    <li>Great communication skills   </li>
                                    <li>A love for going above and beyond for customers and making sure they get the best experience of our services   </li>
                                    <li>Extremely organised, high attention to detail   </li>
                                    <li>Must Carry A positive can-do attitude, open to new and unexpected challenges   </li>
                                    <li>Enjoys the fast-paced and - wearer of many hats nature of working in a startup environment   </li>
                                    </ul>
                            </div>
                        </div>
                    </div>
                </section>

                <ApplyNow
                    show={isShowApplyNowModal && jobTitle}
                    jobTitle={jobTitle}
                    handleClose={handleShowApplyNow}
                />
            </WebBase>
        </>
    )
}

export default Career
