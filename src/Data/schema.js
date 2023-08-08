const Schema = () => {
  return {
    basics: {
      name: "John Doe",
      label: "Programmer",
      image: "",
      email: "john@gmail.com",
      phone: "(912) 555-4321",
      url: "https://johndoe.com",
      summary: "A summary of John Doe…",
      location: {
        address: "2712 Broadway St",
        postalCode: "CA 94115",
        city: "San Francisco",
        countryCode: "US",
        region: "California",
      },
      profiles: [
        {
          network: "Twitter",
          username: "john",
          url: "https://twitter.com/john",
        },
      ],
    },
    work: [
      {
        name: "Company",
        position: "President",
        url: "https://company.com",
        startDate: "2013-01-01",
        endDate: "2014-01-01",
        summary: "Description…",
        highlights: ["Started the company"],
      },
    ],
    volunteer: [
      {
        organization: "Organization",
        position: "Volunteer",
        url: "https://organization.com/",
        startDate: "2012-01-01",
        endDate: "2013-01-01",
        summary: "Description…",
        highlights: ["Awarded 'Volunteer of the Month'"],
      },
    ],
    education: [
      {
        institution: "University",
        url: "https://institution.com/",
        area: "Software Development",
        studyType: "Bachelor",
        startDate: "2011-01-01",
        endDate: "2013-01-01",
        score: "4.0",
        courses: ["DB1101 - Basic SQL"],
      },
    ],
    awards: [
      {
        title: "Award",
        date: "2014-11-01",
        awarder: "Company",
        summary: "There is no spoon.",
      },
    ],
    certificates: [
      {
        name: "Certificate",
        date: "2021-11-07",
        issuer: "Company",
        url: "https://certificate.com",
      },
    ],
    publications: [
      {
        name: "Publication",
        publisher: "Company",
        releaseDate: "2014-10-01",
        url: "https://publication.com",
        summary: "Description…",
      },
    ],
    skills: [
      {
        name: "Web Development",
        level: "Master",
        keywords: ["HTML", "CSS", "JavaScript"],
      },
    ],
    languages: [
      {
        language: "English",
        fluency: "Native speaker",
      },
    ],
    interests: [
      {
        name: "Wildlife",
        keywords: ["Ferrets", "Unicorns"],
      },
    ],
    references: [
      {
        name: "Jane Doe",
        reference: "Reference…",
      },
    ],
    projects: [
      {
        name: "Project",
        startDate: "2019-01-01",
        endDate: "2021-01-01",
        summary: "Summary...",
        highlights: ["Won award at AIHacks 2016"],
        url: "https://project.com/",
      },
    ],
  };
};

export const basic = {
  name: {
    type: "text",
    label: "Name",
    name: "name",
    span: 2,
  },
  label: {
    type: "text",
    label: "Label/Heading",
    name: "label",
    span: 2,
  },
  image: {
    type: "text",
    label: "Image URL",
    name: "image",
    span: 2,
  },
  email: {
    type: "email",
    label: "Email",
    name: "email",
    span: 2,
  },
  phone: {
    type: "text",
    label: "Phone Number",
    name: "phone",
    span: 2,
  },
  url: {
    type: "text",
    label: "Personal URL",
    name: "url",
    span: 2,
  },
  summary: {
    type: "text",
    label: "Profile Summery",
    name: "summery",
    span: 2,
  },
};

export const location = {
  address: {
    type: "text",
    label: "First Line",
    name: "addFirstLine",
    span: 2,
  },
  postalCode: {
    type: "text",
    label: "Zip code",
    name: "zip",
    span: 2,
  },
  city: {
    type: "text",
    label: "City",
    name: "city",
    span: 2,
  },
  countryCode: {
    type: "text",
    label: "Country Code",
    name: "countryCode",
    span: 2,
  },
  region: {
    type: "text",
    label: "Region",
    name: "region",
    span: 2,
  },
};

export const Profiles = {
  network: {
    type: "text",
    label: "Network",
    name: "network",
    span: 2,
  },
  username: {
    type: "text",
    label: "Username",
    name: "username",
    span: 2,
  },
  url: {
    type: "text",
    label: "URL",
    name: "url",
    span: 2,
  },
};

export default Schema;
