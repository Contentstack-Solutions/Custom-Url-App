/* Import React modules */
import React, { useEffect, useState } from "react";
/* Import other node modules */
import ContentstackAppSdk from "@contentstack/app-sdk";
import {
  Button,
  Icon,
  TextInput,
  cbModal,
} from "@contentstack/venus-components";

import localeTexts from "../../common/locale/en-us";
import { TypeSDKData } from "../../common/types";
/* Import our modules */
/* Import node module CSS */
/* Import our CSS */
import "./styles.scss";
import SelectModal from "../../components/SelectModal";

const CustomField: React.FC = function () {
  const [state, setState] = useState<TypeSDKData>({
    config: {},
    location: {},
    appSdkInitialized: false,
  });

  const [value, setValue] = useState("");
  const [envList, setEnvList] = useState<any>({});

  const localPreviewModal = (props: any) => (
    <SelectModal
      listOfEnv={envList?.environments}
      {...props}
      currentValue={value}
    />
  );
  const handleClick = () => {
    cbModal({
      component: (props: JSX.IntrinsicAttributes & { closeModal: any }) =>
        localPreviewModal(props),
      modalProps: {
        size: "max",
      },
    });
  };

  const handleUrl = (appSdk: any) => {
    let path;
    /* eslint-disable-next-line */
    if (appSdk?.location?.CustomField?.entry?._changedData?.title) {
      /* eslint-disable-next-line */
      path = `/${appSdk?.location?.CustomField?.entry?._changedData?.title
        ?.replace(/[^\w]+/g, "-")
        ?.split(" ")
        ?.join("-")
        ?.toLowerCase()}`;

      /* eslint-disable-next-line */
    } else if (appSdk?.location?.CustomField?.entry?._data?.title) {
      /* eslint-disable-next-line */
      path = `/${appSdk?.location?.CustomField?.entry?._data?.title
        ?.replace(/[^\w]+/g, "-")
        ?.split(" ")
        ?.join("-")
        ?.toLowerCase()}`;
    } else {
      path = value;
    }
    setValue(path);
  };

  useEffect(() => {
    state?.location?.CustomField?.field?.setData(value);
  }, [value]);

  useEffect(() => {
    ContentstackAppSdk.init()
      .then(async (appSdk) => {
        appSdk?.location?.CustomField?.entry?.onChange(() => {
          handleUrl(appSdk);
        });
        handleUrl(appSdk);

        const config = await appSdk?.getConfig();
        const initialData: any =
          appSdk?.location?.CustomField?.field?.getData();

        appSdk?.location?.CustomField?.frame?.updateHeight(70);
        const getEnvList = await appSdk?.stack?.getEnvironments();

        setEnvList(getEnvList);
        if (initialData) {
          setValue(initialData);
        }
        setState({
          config,
          location: appSdk.location,
          appSdkInitialized: true,
        });
      })
      .catch((error) => {
        console.error("appSdk initialization error", error);
      });
  }, []);

  return (
    <div className="layout-container">
      {state.appSdkInitialized && (
        <div className="field-wrapper">
          <TextInput
            className="field"
            maxLength={50}
            value={value}
            width="x-large"
            placeholder={localeTexts.CustomField.input.placeHolderText}
            onChange={handleUrl}
            name="name"
            type="url"
            version="v2"
            suffix={
              <Button
                buttonType="outline"
                id="modal-stories"
                onClick={handleClick}
              >
                <span>
                  <Icon icon="Eye" />
                </span>
              </Button>
            }
          />
        </div>
      )}
    </div>
  );
};

export default CustomField;
