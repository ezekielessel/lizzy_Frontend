import flowerCard from "../../assets/heroImage.png";
import service1 from "../../assets/wedding.png";
import service2 from "../../assets/service.jpg";
import service3 from "../../assets/service.jpg";
import service4 from "../../assets/service.jpg";
import Header from "../header/header";

interface Item {
  id: number;
  imageUrl: string;
  text: string;
  p: string;
}

const items: Item[] = [
  {
    id: 1,
    imageUrl: `${service1}`,
    text: "Wedding Invitations",
    p: " Elegant designs for your special day.",
  },
  {
    id: 2,
    imageUrl: `${service2}`,
    text: "Custom Designs",
    p: " Personalized cards tailored to your preferences.",
  },
  {
    id: 3,
    imageUrl: `${service3}`,
    text: "Print Quality",
    p: " High-quality printing for a premium feel.",
  },
  {
    id: 4,
    imageUrl: `${service4}`,
    text: "Timely Delivery",
    p: "Prompt delivery to meet your deadlines.",
  },
];

const HomePage: React.FC = () => (
  <>
    <Header />
    <main className=" pt-3">
      <div className=" flex-grow  p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="hero">
            <h1
              className="text-6xl font-semibold  mb-5"
              style={{ color: "#054d65" }}
            >
              Kawsel Media
            </h1>
            <p className="text-gray-600 mb-5">
              Creating beautiful wedding cards and invitations. Kawsel Media
              is a full service agency that sells printing and related
              services. Products such as business cards, letterhead, envelopes,
              brochures, booklets, banners etc.
            </p>

            {/*<a
              href="#"
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Contact Us
              <svg
                className="w-3.5 h-3.5 ml-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </a>*/}
          </div>
          <div className="hero">
            <img src={flowerCard} alt="Flower Card" className="w-full h-auto" />
          </div>
        </div>
        {/* Hero section */}
        {/* Product section */}
        <div className="product mt-8">
          <h4 className="text-2xl font-semibold mb-4 mt-2 text-center"style={{ color: "#054d65" }}>
            Our Services
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Service 1 */}
            {items.map((item) => (
              <div
                key={item.id}
                className="service-card block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
              >
                <div className="flex flex-row gap-3 items-center">
                  <img
                    src={item.imageUrl}
                    alt="Service 1"
                    className="rounded-full  h-16 w-16
                  flex items-center justify-center"
                  />
                  <h5 className="text-lg font-semibold mb-1">{item.text}</h5>
                </div>

                <p className="text-gray-600 mt-2">{item.p}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  </>
);

export default HomePage;
