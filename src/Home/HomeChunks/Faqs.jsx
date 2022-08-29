
import React from 'react';
import { Accordion, Card } from "react-bootstrap";

const Faqs = () => {
    return (
        <>
            <section className="pt-5 pb-5 mt-4 accordion_section">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-7 col-md-7 col-12">
                            <h5 className="heading_fs">FAQ's</h5>
                            <div className="accordion faq_accordion">
                                <div className="card mb-0">
                                <Accordion>
                                    <Accordion.Toggle as={Card.Header} eventKey="0">
                                        <h4 className="mb-0 card-title" style={{display:'flex', justifyContent:'space-between'}}>
                                            <span>How do I start shipping with Yolojet?</span>
                                            <i className="fa fa-chevron-down"></i>
                                        </h4>

                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey="0">
                                        <div className="card-body">
                                        To ship your first order, you need to recharge your shipping account. When you click Select Courier you will need to add money to your Yolojet wallet. After you recharge, you can select the courier you want to use.
                                        </div>
                                    </Accordion.Collapse>
                                    <Accordion.Toggle as={Card.Header} eventKey="1">
                                        <h4 className="mb-0 card-title" style={{display:'flex', justifyContent:'space-between'}}>
                                            <span>How YOLOJET works?</span>
                                            <i className="fa fa-chevron-down"></i>
                                        </h4>

                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey="1">
                                        <div className="card-body">
                                        Choose your shipment.
                                        Import all your orders with automated channel sync and select the shipment.
                                        Select courier partner.
                                        Based on your requirement select a courier partner.
                                        Pack and ship. Pack your orders, print labels and hand it over to the courier partner.
                                        Track.
                                        </div>
                                    </Accordion.Collapse>
                                    <Accordion.Toggle as={Card.Header} eventKey="2">
                                        <h4 className="mb-0 card-title" style={{display:'flex', justifyContent:'space-between'}}>
                                            <span>How is Yolojet different from others?</span>
                                            <i className="fa fa-chevron-down"></i>
                                        </h4>

                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey="2">
                                        <div className="card-body">
                                        With Yolojet, you get to ship with 12+ courier partners.  You can judge the pickup performance of one courier partner, and if you feel that it is not upto the mark, you can choose another one for your next shipment. You can choose the best courier partner based on their performance in different regions. Moreover, our proprietary courier recommendation engine recommends the best courier partner for your order based on several parameters.
                                        </div>
                                    </Accordion.Collapse>
                                    <Accordion.Toggle as={Card.Header} eventKey="3">
                                        <h4 className="mb-0 card-title" style={{display:'flex', justifyContent:'space-between'}}>
                                            <span>How can Yolojet help me to improve my returns</span>
                                            <i className="fa fa-chevron-down"></i>
                                        </h4>

                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey="3">
                                        <div className="card-body">
                                        The return ratio for COD Orders is much higher than that of prepaid orders. Cancellations/rejections post shipping can be decreased by an order confirmation call. Fake remarks are also a pain point. These can be avoided through a well-planned NDR management process. Yolojet provides both these services to our clients - and it leads to a substantial RTO ratio decrease.
                                        </div>
                                    </Accordion.Collapse>
                                    <Accordion.Toggle as={Card.Header} eventKey="4">
                                        <h4 className="mb-0 card-title" style={{display:'flex', justifyContent:'space-between'}}>
                                            <span>What is Yolojet Early COD?</span>
                                            <i className="fa fa-chevron-down"></i>
                                        </h4>

                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey="4">
                                        <div className="card-body">
                                        Incase of COD the delivery agents collects cash for the amount of invoice from its consignee  at the time of delivery which is  then deposited at the local office of the consigner. With Yolojet's Early COD the money collected is remitted to the seller, after maximum of 2 days of order delivery.
                                        </div>
                                    </Accordion.Collapse>

                                    <Accordion.Toggle as={Card.Header} eventKey="5">
                                        <h4 className="mb-0 card-title" style={{display:'flex', justifyContent:'space-between'}}>
                                            <span>How to activate my early COD?</span>
                                            <i className="fa fa-chevron-down"></i>
                                        </h4>

                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey="5">
                                        <div className="card-body">
                                        The Yolojet Early COD is a feature which is available for any seller, unlike other e logistic providers.
                                        </div>
                                    </Accordion.Collapse>
                                    <Accordion.Toggle as={Card.Header} eventKey="6">
                                        <h4 className="mb-0 card-title" style={{display:'flex', justifyContent:'space-between'}}>
                                            <span>Can I ship directly through my website/ ecommerce channel?</span>
                                            <i className="fa fa-chevron-down"></i>
                                        </h4>

                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey="6">
                                        <div className="card-body">
                                        Yes, you may  integrate your website/ ecommerce channel link with your Yolojet account to ship directly.
                                        </div>
                                    </Accordion.Collapse>
                                    <Accordion.Toggle as={Card.Header} eventKey="7">
                                        <h4 className="mb-0 card-title" style={{display:'flex', justifyContent:'space-between'}}>
                                            <span>Can I use more than one courier partner?</span>
                                            <i className="fa fa-chevron-down"></i>
                                        </h4>

                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey="7">
                                        <div className="card-body">
                                        Yes, Yolojet provides you option to view and compare the rates from our multiple courier partners and select the one which suites you best.
                                        </div>
                                    </Accordion.Collapse>
                                    <Accordion.Toggle as={Card.Header} eventKey="8">
                                        <h4 className="mb-0 card-title" style={{display:'flex', justifyContent:'space-between'}}>
                                            <span>How many COD and pickup pincodes do you cover?</span>
                                            <i className="fa fa-chevron-down"></i>
                                        </h4>

                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey="8">
                                        <div className="card-body">
                                        We currently cover 27000+ pincodes
                                        </div>
                                    </Accordion.Collapse>
                                    <Accordion.Toggle as={Card.Header} eventKey="9">
                                        <h4 className="mb-0 card-title" style={{display:'flex', justifyContent:'space-between'}}>
                                            <span>What is Multi packet shipment?</span>
                                            <i className="fa fa-chevron-down"></i>
                                        </h4>

                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey="9">
                                        <div className="card-body">
                                        The process by which multiple products can be shipped with a single order number is called Multi packet shipment. Such kind of shipment, even carrying multiple products is assigned with a single master airway bill.
                                        </div>
                                    </Accordion.Collapse>
                                    <Accordion.Toggle as={Card.Header} eventKey="10">
                                        <h4 className="mb-0 card-title" style={{display:'flex', justifyContent:'space-between'}}>
                                            <span>Is Yolojet a courier partner?</span>
                                            <i className="fa fa-chevron-down"></i>
                                        </h4>

                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey="10">
                                        <div className="card-body">
                                        Yololojet is a cutting edge technology powered, automated shipping solution, which brings logistic companies and the customers on the same platform to help them scalling up their business.
                                        </div>
                                    </Accordion.Collapse>
                                    <Accordion.Toggle as={Card.Header} eventKey="11">
                                        <h4 className="mb-0 card-title" style={{display:'flex', justifyContent:'space-between'}}>
                                            <span>Which products are dangerous/prohibited to be shipped through Yolojet?</span>
                                            <i className="fa fa-chevron-down"></i>
                                        </h4>

                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey="11">
                                        <div className="card-body">
                                        <strong className="font-size-20 mb-2 d-block">Dangerous Goods</strong>
                                        <strong>Definition:</strong> Commodities, which possess potentially hazardous characteristics. These are as the laid out by IATA in the Dangerous Goods Regulations.<br />

                                        The categories of dangerous goods are:
                                        <ul>
                                            <li>
                                            Class 1: Explosives
                                            </li>
                                            <li>
                                            Class 2: Gases
                                            </li>
                                            <li>
                                            Class 3: Flammable Liquids
                                            </li>
                                            <li>
                                            Class 4: Flammable Solids
                                            </li>
                                            <li>
                                            Class 5: Oxidizers and Organic Peroxides
                                            </li>
                                            <li>
                                            Class 6: Toxic & Infectious Substances
                                            </li>
                                            <li>
                                            Class 7: Radioactive Material
                                            </li>
                                            <li>
                                            Class 8: Corrosives
                                            </li>
                                            <li>
                                            Class 9: Miscellaneous e.g. Magnets – a danger to airplane equipment
                                        The guidelines are available in the following links:
                                            </li>
                                        </ul>
                                        The guidelines are available in the following links:
                                        <ul>
                                            <li>
                                                <a href="http://www.iata.org/publications/dgr/Pages/index.aspx" target="_blank">Dangerous Goods Regulations (DGR) - http://www.iata.org/publications/dgr/Pages/index.aspx</a>
                                            </li>
                                            <li>
                                                <a href="http://www.iata.org/publications/Pages/live-animals.aspx" target="_blank">Live Animals Regulations (LAR) - http://www.iata.org/publications/Pages/live-animals.aspx</a>
                                            </li>
                                            <li>
                                                <a href="http://www.iata.org/publications/Pages/perishable-cargo.aspx" target="_blank">Perishable Cargo Regulations (PCR) - http://www.iata.org/publications/Pages/perishable-cargo.aspx</a>
                                            </li>
                                            <li>
                                                <a href="http://www.iata.org/publications/Pages/lithium-battery-guidelines.aspx" target="_blank">Lithium Battery Shipping Guidelines (LBSG) - http://www.iata.org/publications/Pages/lithium-battery-guidelines.aspx</a>
                                            </li>
                                        </ul>
                                        <strong className="font-size-20 mb-2 d-block">Restricted & Banned Items:</strong>
                                        <ul>
                                            <li>
                                            Prohibited Goods not permitted to book in any network
                                            </li>
                                            <li>
                                            Live Stock and its Articles
                                            </li>
                                            <li>
                                            Activated SIM cards
                                            </li>
                                            <li>
                                            Air guns, replica and imitation firearms
                                            </li>
                                            <li>
                                            Alcohol/tobacco/drugs/poisonous goods
                                            </li>
                                            <li>
                                            Animal Raw Skins/Furs
                                            </li>
                                            <li>
                                            Antiques (objects over 100 years old)
                                            </li>
                                            <li>
                                            APO ( Army Post Office ) / FPO ( Fleet Post Office )/DPO (Diplomatic Post Office) Addresses
                                            </li>
                                            <li>
                                            Arms & Ammunitions
                                            </li>
                                            <li>
                                            Asbestos
                                            </li>
                                            <li>
                                            Biological Substance, Category B
                                            </li>
                                            <li>
                                            Bullion (of any precious metal)
                                            </li>
                                            <li>
                                            Contraband including, but not limited to, illicit drugs and counterfeit goods
                                            </li>
                                            <li>
                                            Corrosive items (acids, chemicals), radioactive material such as Aluminum chloride, Caustic soda, Corrosive cleaning fluid, Corrosive rust remover/preventative, Corrosive paint remover (Nail Polish), Acid (Hydrochloric acid, Nitric acid, Sulphuric acid, etc.)
                                            </li>
                                            <li>
                                            Cremated or Disinerred Human Remains
                                            </li>
                                            <li>
                                            Currency, Cheques, Bullion, Payment Cards, Traveler Cheques, Stamps
                                            </li>
                                        </ul>

                                        <strong className="font-size-20 mb-2 d-block">Dangerous goods and Hazardous material prohibited or restricted by IATA /ICAO and other Government or Regulatory Agencies</strong>
                                        <ul>
                                            <li>
                                            Dry Ice
                                            </li>
                                            <li>
                                            Drugs - Cocaine, Cannabis resin, LSD, Narcotics, Morphine,Opium, Psychotropic substances, etc.
                                            </li>
                                            <li>
                                            Edible Oils, De-oiled groundnut cakes, Fodder and Rice bran
                                            </li>
                                            <li>
                                            Electronic cigarettes
                                            </li>
                                            <li>
                                            Endangered species/plants and its parts under CITES (Convention on International Trade in Endangered Species of Wild Fauna and Flora)
                                            </li>
                                            <li>
                                            Explosives (arms, ammunition, fireworks, flares, gunpowder, airbag inflators)
                                            </li>
                                            <li>
                                            Fire extinguishers
                                            </li>
                                            <li>
                                            Fireworks and Other items of an incendiary or Flammable nature
                                            </li>
                                            <li>
                                            Flammable items (fire crackers, oil cans, adhesives, paint cans)
                                            </li>
                                            <li>
                                            Gambling devices, lottery tickets
                                            </li>
                                            <li>
                                            Gold, Silver, Platinum, Articles of Gem & Jewelry
                                            </li>
                                            <li>
                                            Gases compressed, liquefied or dissolved under pressure
                                            </li>
                                        </ul>

                                        <strong className="font-size-20 mb-2 d-block">
                                        Hazarous Waste, including but not limited to Used Hypodermic Needles and/or Syringes or Medical waste
                                        </strong>
                                        <ul>
                                            <li>
                                            High capacity batteries such as car batteries, generator batteries
                                            </li>
                                            <li>
                                            Human and Animal Embryos,
                                            Human and animal remains, including ashes
                                            Human Corpses, Organs or Body Parts.
                                            Hunting (animal) trophies,
                                            </li>
                                            <li>
                                            Indian Postal Articles,
                                            Industrial Diamonds,
                                            Ivory and ivory products
                                            </li>
                                        </ul>
                                        <strong className="font-size-20 mb-2 d-block">
                                        Ketamine and other Drugs of Illegal Narcotics (contraband) and Psychotropic substances
                                        </strong>

                                        <ul>
                                            <li>
                                            Knives,LEDs, LCDs, plasma, OLED and any kind of television screens
                                            </li>
                                            <li>
                                            Letter of Credit/Bill of Lading
                                            </li>
                                            <li>
                                            Liquid Chemicals and other liquid products
                                            </li>
                                            <li>
                                            Lottery tickets and gambling devices where prohibited by law.
                                            </li>
                                            <li>
                                            Machinery parts containing oil, grease, fuel or batteries,Magnetized material
                                            </li>
                                            <li>
                                            Marijuana, including Marijuana intended for medical use
                                            </li>
                                            <li>
                                            Meat and Edible Meat of all kinds
                                            </li>
                                        </ul>
                                        <strong className="font-size-20 mb-2 d-block">
                                        Narcotic drugs and Psychotropic substances
                                        </strong>
                                        <ul>
                                            <li>
                                            Negotiable Items or documents
                                            </li>
                                            <li>
                                            Negotiable Currency - Bullion, Money, Fake/Dummy/Collectable Cash, Payment Cards, Traveler Cheques, Passports, IDs, Stamps
                                            </li>
                                        </ul>
                                        <strong className="font-size-20 mb-2 d-block">
                                        Oxidizing substances and organic peroxides Solids such as
                                        </strong>
                                        <ul>
                                            <li>
                                            Fertilizers, Dyes, Bromates, Chlorates, Nitrates, Perchlorates, Permanganates, Peroxides, Weed killers, Insecticides
                                            </li>
                                        </ul>
                                        <strong className="font-size-20 mb-2 d-block">
                                        Plants and plant material including Seeds and Cut Flowers
                                        </strong>
                                        <ul>
                                            <li>
                                            Pornographic material - Precious, semi-precious metals or stones in any form including bricks
                                            </li>
                                            <li>
                                            Radioactive material - Fissile material (Uranium 235, etc.), Radioactive waste material, Thorium or Uranium ores etc
                                            </li>
                                            <li>
                                            Sand/Soil and Ores , Sandalwood and its oils
                                            </li>
                                            <li>
                                            Sea shells, including polished sea shells and handicrafts
                                            </li>
                                            <li>
                                            Special Chemicals, Organisms, Materials, Equipments & Technologies (SCOMET) items
                                            </li>
                                            <li>Sword, Toner (Photocopier)</li>
                                        </ul>
                                        <strong className="font-size-20 mb-2 d-block">
                                        Toxic and infectious substances
                                        </strong>
                                        <ul>
                                            <li>
                                            Arsenic, Beryllium, Cyanide, Fluorine, Hydrogen Solenoid, Mercury, Mercury salts, Mustard gas, Nitrobenzene, Nitrogen dioxide, Pesticides, Poisons, Rat poison, Ebola, Foot and mouth disease, Environmental, clinical and medical waste
                                            </li>
                                            <li>
                                            Wet Ice (Frozen Water), Wood and wood pulp/products
                                            </li>
                                        </ul>
                                        </div>
                                    </Accordion.Collapse>

                                    <Accordion.Toggle as={Card.Header} eventKey="12">
                                        <h4 className="mb-0 card-title" style={{display:'flex', justifyContent:'space-between'}}>
                                            <span>Whom should I contact Yolojet or Courier partner?</span>
                                            <i className="fa fa-chevron-down"></i>
                                        </h4>

                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey="12">
                                        <div className="card-body">
                                        Please reach Yolojet on <a href="mailto:reachus@yolojet.com">reachus@yolojet.com</a> for any question or query related to a shipment that is shipped with Yolojet
                                        </div>
                                    </Accordion.Collapse>
                                </Accordion>
                                </div>
                            </div>

                        </div>
                        <div className="col-lg-5 col-md-5 col-12 mt-3">
                            <img src="img/faq-img.png" alt="" />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Faqs
