import {
  Document,
  Font,
  PDFDownloadLink,
  PDFViewer,
  Page,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import { CVState } from "../cvStore";
Font.register({
  family: "Roboto",
  fonts: [
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf",
      fontWeight: 300,
    },
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf",
      fontWeight: 400,
    },
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf",
      fontWeight: 500,
    },
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf",
      fontWeight: 600,
    },
  ],
});

const styles = StyleSheet.create({
  document: {
    fontSize: 13,
  },
  page: {
    fontFamily: "Roboto",
    flexDirection: "column",
    backgroundColor: "#E4E4E4",

    display: "flex",
    color: "black",
  },
  section: {
    margin: 10,
    padding: 10,
    borderTop: "1px solid black",
  },
  infoLine: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  infoBox: {
    display: "flex",
    flexDirection: "column",
  },
  name: {
    fontSize: 24,
    marginBottom: 10,
  },
  firstBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  firstLeft: {
    width: "65%",
  },
  imgBox: {
    width: "30%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    width: "125px",
    height: "125px",
  },
  secondBox: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  eachInfo: {
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },
  smallInfo: {
    display: "flex",
    flexDirection: "row",
    gap: 20,
  },
});

const PersonalInfo = (props: { personal: CVState["personal"] }) => {
  const personal = props.personal;
  return (
    <View style={styles.section}>
      <View style={styles.firstBox}>
        <View style={styles.firstLeft}>
          <View style={styles.name}>
            <Text>
              {personal.name} {personal.surname}
            </Text>
          </View>
          <View style={styles.infoBox}>
            <View style={styles.infoLine}>
              <Text>E-mail: </Text>
              <Text>{personal.email}</Text>
            </View>
            <View style={styles.infoLine}>
              <Text>Telefon: </Text>
              <Text>{personal.phone}</Text>
            </View>
            <View style={styles.infoLine}>
              {personal.dateOfBirth && (
                <>
                  <Text>Data urodzenia: </Text>
                  <Text>{personal.dateOfBirth.toLocaleDateString()}</Text>
                </>
              )}
            </View>
            <View style={styles.infoLine}>
              <Text>Miasto: </Text>
              <Text>{personal.city}</Text>
            </View>
          </View>
        </View>
        <View style={styles.imgBox}>
          <Text>Image</Text>
        </View>
      </View>
    </View>
  );
};

function About(props: { about: CVState["about"] }) {
  const about = props.about;
  return (
    <View style={styles.section}>
      <Text>{about.text}</Text>
    </View>
  );
}

function Experience(props: { experience: CVState["experience"] }) {
  const experience = props.experience.experience;
  return (
    <View style={styles.section}>
      <View style={styles.secondBox}>
        <View>
          <Text style={{ fontWeight: 600, fontSize: 22 }}>Doświadczenie</Text>
        </View>
        {experience.map((item) => {
          return (
            <View style={styles.eachInfo}>
              <View>
                <Text>{`${item.startDate} - ${item.endDate}`}</Text>
              </View>
              <View>
                <Text>{item.company}</Text>
                <Text>{item.position}</Text>
                <Text>{item.localization}</Text>
                <Text>{item.description}</Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}

function Education(props: { education: CVState["education"] }) {
  const education = props.education.education;
  return (
    <View style={styles.section}>
      <View style={styles.secondBox}>
        <View>
          <Text style={{ fontWeight: 600, fontSize: 22 }}>Wykształcenie</Text>
        </View>
        {education.map((item) => {
          return (
            <View style={styles.eachInfo}>
              <View>
                <Text>{`${item.startDate} - ${item.endDate}`}</Text>
              </View>
              <View>
                <Text>{item.school}</Text>
                <Text>{item.level}</Text>
                <Text>{item.specialization}</Text>
                <Text>{item.description}</Text>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const SmallInfoBox = () => {
  return (
    <View style={styles.infoBox}>
      <Text style={{ fontWeight: 600, fontSize: 22 }}>Lorem, ipsum.</Text>
      <View style={styles.smallInfo}>
        <Text>Lorem, ipsum</Text>
        <Text>dolor sit</Text>
      </View>
    </View>
  );
};
// Create Document Component
const MyDocument = (props: { info: CVState }) => {
  const info = props.info;
  return (
    <Document style={styles.document}>
      <Page size="A4" style={styles.page}>
        <View>
          <PersonalInfo personal={info.personal} />
        </View>
        <About about={info.about} />
        <Experience experience={info.experience} />
        <Education education={info.education} />
        <View style={styles.section}>
          <SmallInfoBox />
        </View>
        <View style={styles.section}>
          <SmallInfoBox />
        </View>
        <View style={styles.section}>
          <SmallInfoBox />
        </View>
      </Page>
    </Document>
  );
};
export const CV = (props: { info: CVState }) => {
  const info = props.info;
  return (
    <div>
      <PDFDownloadLink
        document={<MyDocument info={info} />}
        fileName="somename.pdf"
      >
        {({ loading }) => (loading ? "Loading document..." : "Download now!")}
      </PDFDownloadLink>
      <PDFViewer
        showToolbar={false}
        height={"877px"}
        width={"620px"}
        style={{ border: "none", backgroundColor: "white" }}
      >
        <MyDocument info={info} />
      </PDFViewer>
    </div>
  );
};
