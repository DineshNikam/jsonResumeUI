import * as Yup from "yup";
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const resumeSchema = Yup.object().shape({
  // id: Yup.string().required("Id is required").max(3, "No more than 3"),
  basics: Yup.object().shape({
    name: Yup.string().required("Name is required").min(3, "THree char long"),
    label: Yup.string().required("Label is required"),
    image: Yup.string(),
    url: Yup.string().matches(
      /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
      "Enter correct url!"
    ),
    summary: Yup.string(),
    email: Yup.string()
      .required("Email is Must")
      .matches(/@[^.]*\./, "Email Must be valid with '@' & '.' in it"),
    phone: Yup.string().matches(phoneRegExp, "Phone number is not valid"),
    location: Yup.object().shape({
      address: Yup.string(),
      postalCode: Yup.string(),
      city: Yup.string(),
      countryCode: Yup.string(),
      region: Yup.string(),
    }),
    profiles: Yup.array().of(
      Yup.object().shape({
        network: Yup.string(),
        // .required("Network is required")
        username: Yup.string(),
        // .required("Username is required")
        url: Yup.string().url("Invalid URL format"),
        // .required("URL is required")
      })
    ),
  }),

  work: Yup.array().of(
    Yup.object().shape({
      name: Yup.string(),
      position: Yup.string(),
      url: Yup.string().url("Invalid URL"),
      startDate: Yup.date(),
      endDate: Yup.date(),
      summary: Yup.string(),
      highlights: Yup.array().of(Yup.string()),
    })
  ),

  education: Yup.array().of(
    Yup.object().shape({
      institution: Yup.string(),
      url: Yup.string().url("Invalid URL"),
      area: Yup.string(),
      studyType: Yup.string(),
      startDate: Yup.date(),
      endDate: Yup.date(),
      score: Yup.string(),
      courses: Yup.array().of(Yup.string()),
    })
  ),

  volunteer: Yup.array().of(
    Yup.object().shape({
      organization: Yup.string(),
      position: Yup.string(),
      url: Yup.string().url("Invalid URL"),
      startDate: Yup.date(),
      endDate: Yup.date(),
      summary: Yup.string(),
      highlights: Yup.array().of(Yup.string()),
    })
  ),
  awards: Yup.array().of(
    Yup.object().shape({
      title: Yup.string(),
      date: Yup.date(),
      awarder: Yup.string(),
      summary: Yup.string(),
    })
  ),
  certificates: Yup.array().of(
    Yup.object().shape({
      name: Yup.string(),
      date: Yup.date("Invalid Date format use  DD/MM/YYYY"),
      issuer: Yup.string(),
      url: Yup.string().url("Invalid URL"),
    })
  ),
  publications: Yup.array().of(
    Yup.object().shape({
      name: Yup.string(),
      publisher: Yup.string(),
      releaseDate: Yup.date(),
      url: Yup.string().url("Invalid URL"),
      summary: Yup.string(),
    })
  ),
  skills: Yup.array().of(
    Yup.object().shape({
      name: Yup.string(),
      level: Yup.string(),
      keywords: Yup.array().of(Yup.string()),
    })
  ),
  languages: Yup.array().of(
    Yup.object().shape({
      language: Yup.string(),
      fluency: Yup.string(),
    })
  ),
  interests: Yup.array().of(
    Yup.object().shape({
      name: Yup.string(),
      keywords: Yup.array().of(Yup.string()),
    })
  ),
  references: Yup.array().of(
    Yup.object().shape({
      name: Yup.string(),
      reference: Yup.string(),
    })
  ),
  projects: Yup.array().of(
    Yup.object().shape({
      name: Yup.string(),
      startDate: Yup.date(),
      endDate: Yup.date(),
      summary: Yup.string(),
      highlights: Yup.array().of(Yup.string()),
      url: Yup.string().url("Invalid URL"),
    })
  ),
});

export default resumeSchema;
