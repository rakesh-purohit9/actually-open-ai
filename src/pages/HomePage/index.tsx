import React from "react";

import { Text, Button, Img, Input, Line, SelectBox } from "components";
import {
  postCompletions,
  PostCompletionsRequestType,
  PostCompletionsResponseType,
} from "service/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useForm from "hooks/useForm";

const HomePage: React.FC = () => {
  const [apiData, setapiData] = React.useState<PostCompletionsResponseType>();
  const [selectedValue, setSelectedValue] = React.useState("");
  const form = useForm({ prompt: "" });

  function callApi(data: Partial<{ prompt: string }>) {
    const req = {
      data: {
        prompt: `${selectedValue}${data?.prompt}`,
        model: "text-curie-001",
        temperature: 0,
        max_tokens: 150,
        top_p: 1,
        frequency_penalty: 1,
        presence_penalty: 1,
      },
    };

    postCompletions(req)
      .then((res) => {
        setapiData(res?.data);
        console.log(res?.data?.choices);
        toast.success("AI rocks!");
      })
      .catch((err) => {
        console.error(err);
        toast.error("AI is new in this world!");
      });
  }

  return (
    <>
      <div className="bg-white_A700 flex flex-col items-center justify-start mx-[auto] pb-[186px] w-[100%]">
        <div className="bg-indigo_A700 flex font-inter items-start justify-end p-[32px] sm:px-[20px] w-[100%]">
          <Text
            className="ml-[] mt-[] text-left text-white_A700 tracking-[] w-[auto]"
            as="h1"
            variant="h1"
          >
            Actually Open AI
          </Text>
        </div>
        <div className="flex flex-col font-inter gap-[45px] items-center justify-start mt-[68px] md:px-[20px] md:w-[100%] w-[23%]">
          <div className="flex flex-col md:gap-[40px] gap-[69px] items-center justify-start w-[100%]">
            {/* topic */}
            <div className="flex flex-col gap-[5px] items-start justify-start w-[327px]">
              <Text
                className="not-italic text-black_900_dd text-left tracking-[0.50px] w-[auto]"
                as="h3"
                variant="h3"
              >
                Enter a prompt/topic you want the AI to write on.
              </Text>
              <div className="flex flex-col gap-[8px] items-start justify-start pt-[8px] w-[100%]">
                <div className="flex flex-row gap-[5px] h-[20px] md:h-[auto] items-center justify-start px-[5px] w-[100%]">
                  <Button className="flex h-[20px] items-center justify-center rounded-[50%] w-[20px]">
                    <Img
                      src="images/img_uenvelopealt.svg"
                      className="h-[14px]"
                      alt="uenvelopealt"
                    />
                  </Button>
                  <Input
                    className="flex-1 font-normal not-italic text-[12px] placeholder:text-black_900_60 text-black_900_60 text-left tracking-[0.50px] w-[100%]"
                    wrapClassName="sm:w-[100%] w-[83%]"
                    onChange={(e) => {
                      form.handleChange("prompt", e.target.value);
                    }}
                    value={form?.values?.prompt}
                    name="GroupFour"
                    placeholder="Enter the topic or sentence"
                  ></Input>
                  <Button className="flex h-[20px] items-center justify-center rounded-[50%] w-[20px]">
                    <Img
                      src="images/img_info.svg"
                      className="h-[14px]"
                      alt="info"
                    />
                  </Button>
                </div>
                <Line className="bg-black_900_60 h-[1px] w-[100%]" />
              </div>
              <Text
                className="not-italic text-black_900_60 text-left w-[auto]"
                as="h4"
                variant="h4"
              >
                Hint: A short specific topic
              </Text>
            </div>
            {/* dropdown */}
            <div className="flex flex-col gap-[5px] items-start justify-start w-[327px]">
              <Text
                className="not-italic text-black_900_dd text-left tracking-[0.50px] w-[auto]"
                as="h3"
                variant="h3"
              >
                Select Operation
              </Text>
              <SelectBox
                className="font-normal not-italic text-[12px] text-black_900_60 text-left tracking-[0.50px] w-[100%]"
                placeholderClassName="text-black_900_60"
                name="FrameFour"
                placeholder="Operation"
                isSearchable={false}
                isMulti={false}
                value={selectedValue}
                onChange={(selectedVal) => {
                  console.log(selectedVal);
                  setSelectedValue(selectedVal);
                }}
                indicator={
                  <Img
                    src="images/img_arrowdown.svg"
                    className="h-[16px] w-[16px] p-[3px] rounded-[50%]"
                    alt="arrow_down"
                  />
                }
              ></SelectBox>
              <Text
                className="not-italic text-black_900_60 text-left w-[auto]"
                as="h4"
                variant="h4"
              >
                Hint: Based on your input, we help you write the content.
              </Text>
            </div>
          </div>
          <Button
            className="common-pointer cursor-pointer font-normal not-italic text-[12px] text-center text-white_A700 tracking-[0.50px] w-[327px]"
            onClick={() => {
              form.handleSubmit(callApi);
            }}
            shape="RoundedBorder3"
            size="sm"
            variant="FillBlueA700"
          >
            Write for me
          </Button>
        </div>
        {!!apiData?.choices?.[0]?.text ? (
          <Text
            className="font-roboto leading-[20.00px] mt-[26px] not-italic text-black_900_99 text-left tracking-[0.25px] sm:w-[100%] w-[63%]"
            as="h3"
            variant="h3"
          >
            {apiData?.choices?.[0]?.text?.replaceAll(/\n/g,' ')?.replaceAll(/\r/g,' ')}
          </Text>
        ) : null}
      </div>
      <ToastContainer />
    </>
  );
};

export default HomePage;
