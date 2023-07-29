import { TextInput, Button, Group, Box, Radio } from "@mantine/core";
import { useForm } from "@mantine/form";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";
import requestHandler from "../utils/requestHandler";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/authContext";

function Predict() {
  const [search, setSearch] = useState("");
  const form = useForm({
    initialValues: {
      percentage_in_OperatingSystems: "",
      percentage_in_Algorithms: "",
      percentage_in_ProgrammingConcepts: "",
      percentage_in_SoftwareEngineering: "",
      percentage_in_ComputerNetworks: "",
      percentage_in_ElectronicsSubjects: "",
      percentage_in_ComputerArchitecture: "",
      percentage_in_Mathematics: "",
      percentage_in_CommunicationSkills: "",
      hours_working_per_day: "",
      logical_quotient_rating: "",
      coding_skills_rating: "",
      public_speaking: "",
      points_can_work_long_time_before_system: "",
      self_learning_capability: "",
      reading_and_writing_skills: "",
      memory_capability_score: "",
      job_higher_studies: "",
      in_a_realtionship: "",
      gentle_or_tuff_behaviour: "",
      management_or_technical: "",
      salary_or_work: "",
      hard_or_smart_worker: "",
      worked_in_teams_ever: "",
      extra_courses_did: "",
      introvert: "",
      hackathons: "",
      interests_1: "",
      interests_2: "",
      interests_3: "",
      type_of_company_want_to_settle_in: "",
    },
  });

  const { token, currentUser } = useContext(AuthContext);
  const [predictedJob, setPreditedJob] = useState();

  const labels = [
    "Percentage in Operating Systems",
    "Percentage in Algorithms",
    "Percentage in Programming Concepts",
    "Percentage in Software Engineering",
    "Percentage in Computer Networks",
    "Percentage in Electronics Subjects",
    "Percentage in Computer Architecture",
    "Percentage in Mathematics",
    "Percentage in Communication Skills",
    "Working hours per day",
    "Logical Quotient",
    "Rate your coding skills",
    "Rate your Public Speaking skills",
    "How long can you work infront of computer screen?",
    "Self learning capability",
    "Reading and Writing Skills",
    "Memory Capability Score",
    "Job or Higher Studies?",
    "Realtionship Status",
    "Attitude",
    "Management or Technical?",
    "Salary or Work?",
    "Hard Worker or Smart Worker?",
    "Do you have experience working in Teams?",
    "Have you done extra courses?",
    "Introvert or Extrovert?",
    "Participated in hackathons?",
    "First Interest",
    "Second Interest",
    "Third Interest",
    "Search Interest",
    "Interested type of company?",
  ];

  const handleSubmit = (data: any) => {
    const values: any = {};

    let stopLoop = false;
    Object.entries(data).some(([key, value]: any, index: any) => {
      if (index < 17) {
        const parsedValue = parseFloat(value);
        if (isNaN(parsedValue)) {
          //   toast.error("Check Inputs");
          //   stopLoop = true;
          //   return;
          values[key] = value;
        }
        values[key] = parsedValue;
      } else {
        values[key] = value;
      }
    });
    if (stopLoop) return;
    const input = [
      values.percentage_in_OperatingSystems,
      values.percentage_in_Algorithms,
      values.percentage_in_ProgrammingConcepts,
      values.percentage_in_SoftwareEngineering,
      values.percentage_in_ComputerNetworks,
      values.percentage_in_ElectronicsSubjects,
      values.percentage_in_ComputerArchitecture,
      values.percentage_in_Mathematics,
      values.percentage_in_CommunicationSkills,
      values.hours_working_per_day,
      values.logical_quotient_rating,
      values.hackathons,
      values.coding_skills_rating,
      values.public_speaking,
      values.points_can_work_long_time_before_system,
      values.self_learning_capability,
      values.extra_courses_did,
      values.reading_and_writing_skills,
      values.memory_capability_score,
      values.job_higher_studies,
      values.in_a_realtionship,
      values.gentle_or_tuff_behaviour,
      values.management_or_technical,
      values.salary_or_work,
      values.hard_or_smart_worker,
      values.worked_in_teams_ever,
      values.introvert,
      values.interests_1,
      values.interests_2,
      values.interests_3,
      search,
      values.type_of_company_want_to_settle_in,
    ];
    requestHandler("POST", "/api/prediction/predict", { input }, token)
      .then((res: any) => {
        setPreditedJob(res.data.predictedJob);
      })
      .catch((e: any) => {
        console.log(e);
        toast.error("Check Inputs");
      });
  };

  const fetchSearchTerm = () => {
    requestHandler("GET", "/api/analytics", {}, token)
      .then((res: any) => {
        const terms = res.data.searchTerms.sort(
          (a: any, b: any) => b.documents.length - a.documents.length
        );
        if (terms.length > 0) {
          setSearch(terms[0]._id);
        }
      })
      .catch((e: any) => {
        console.log(e);
      });
  };

  useEffect(() => {
    fetchSearchTerm();
  }, []);

  return (
    <>
      <Navbar />
      <div className="bg-beige pt-20">
        <Box maw={400} mx="auto">
          <form
            onSubmit={form.onSubmit((values) => {
              handleSubmit(values);
            })}
          >
            {Object.keys(form.values)
              .slice(0, 17)
              .map((key, i) => {
                return (
                  <TextInput
                    key={i}
                    withAsterisk
                    type={"number"}
                    label={labels[i]}
                    placeholder=""
                    {...form.getInputProps(key)}
                  />
                );
              })}
            <Radio.Group
              {...form.getInputProps("in_a_realtionship")}
              label="Relationship"
              withAsterisk
            >
              <Radio value="1" label="married" />
              <Radio value="0" label="unmarried" />
            </Radio.Group>
            <Radio.Group
              {...form.getInputProps("gentle_or_tuff_behaviour")}
              label="Attitude"
              withAsterisk
            >
              <Radio value="1" label="gentle" />
              <Radio value="0" label="tough" />
            </Radio.Group>
            <Radio.Group
              {...form.getInputProps("job_higher_studies")}
              label="Job / Higher Studies?"
              withAsterisk
            >
              <Radio value="1" label="Job" />
              <Radio value="0" label="Higher Studies" />
            </Radio.Group>
            <Radio.Group
              {...form.getInputProps("management_or_technical")}
              label="Management / Technical?"
              withAsterisk
            >
              <Radio value="0" label="Management" />
              <Radio value="1" label="Technical" />
            </Radio.Group>
            <Radio.Group
              {...form.getInputProps("salary_or_work")}
              label="Salary / Work?"
              withAsterisk
            >
              <Radio value="1" label="Salary" />
              <Radio value="0" label="Work" />
            </Radio.Group>
            <Radio.Group
              {...form.getInputProps("hard_or_smart_worker")}
              label="Hard / Smart Worker?"
              withAsterisk
            >
              <Radio value="0" label="Hard Worker" />
              <Radio value="1" label="Smart Worker" />
            </Radio.Group>
            <Radio.Group
              {...form.getInputProps("hackathons")}
              label="Regular articipant in Hackathons?"
              withAsterisk
            >
              <Radio value="1" label="Yes" />
              <Radio value="0" label="No" />
            </Radio.Group>
            <Radio.Group
              {...form.getInputProps("extra_courses_did")}
              label="Done extra courses?"
              withAsterisk
            >
              <Radio value="1" label="Yes" />
              <Radio value="0" label="No" />
            </Radio.Group>
            <Radio.Group
              {...form.getInputProps("worked_in_teams_ever")}
              label="Experience working in Teams?"
              withAsterisk
            >
              <Radio value="1" label="Yes" />
              <Radio value="0" label="No" />
            </Radio.Group>

            <Radio.Group
              {...form.getInputProps("introvert")}
              label="Are you an introvert / extrovert?"
              withAsterisk
            >
              <Radio value="1" label="Introvert" />
              <Radio value="0" label="Extrovert" />
            </Radio.Group>

            <TextInput
              withAsterisk
              type={"text"}
              label={"First Interest"}
              placeholder=""
              {...form.getInputProps("interests_1")}
            />
            <TextInput
              withAsterisk
              type={"text"}
              label={"Second Interest"}
              placeholder=""
              {...form.getInputProps("interests_2")}
            />
            <TextInput
              withAsterisk
              type={"text"}
              label={"Third Interest"}
              placeholder=""
              {...form.getInputProps("interests_3")}
            />
            {/* <TextInput
              withAsterisk
              type={"text"}
              label={"Search History"}
              placeholder=""
              {...form.getInputProps("search")}
            /> */}
            <TextInput
              withAsterisk
              type={"text"}
              label={"Interested Type of Company"}
              placeholder=""
              {...form.getInputProps("type_of_company_want_to_settle_in")}
            />
            {!predictedJob && (
              <Group position="center" mt="md">
                <Button
                  color="red"
                  className=" bg-red-500 text-md my-10"
                  type="submit"
                >
                  Predict
                </Button>
              </Group>
            )}
          </form>
        </Box>
        {predictedJob && (
          <div className="flex bg-white w-full justify-center items-center h-20 mt-5">
            <h1 className="semibold">Predicted Job: {predictedJob}</h1>
          </div>
        )}
      </div>
    </>
  );
}
export default Predict;
