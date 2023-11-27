import React from "react";
import {
  ModalFooter,
  ModalBody,
  ModalHeader,
  ButtonGroup,
  Button,
  Icon,
} from "@contentstack/venus-components";

import localeTexts from "../../common/locale/en-us";
import "./style.scss";

function SelectModal(
  props: Readonly<{
    closeModal: any;
    listOfEnv: any;
    currentValue: any;
  }>
) {
  return (
    <>
      <ModalHeader
        title={localeTexts.CustomField.modal.headerTitle}
        closeModal={props.closeModal}
      />
      <ModalBody className="modalBodyCustomClass">
        {props?.listOfEnv?.map((env: any) => (
          <div className="environment-link" key={env?.name}>
            <Icon icon="Development" />
            <label className="FieldLabel" htmlFor="localenv">
              {env?.name}
            </label>
            {env?.urls?.[0]?.url ? (
              <a
                id="localenv"
                href={`${env?.urls?.[0]?.url}${props?.currentValue}`}
                className="InstructionText"
                target="_blank"
                rel="noreferrer"
              >
                <span>
                  {env?.urls?.[0]?.url}
                  {props?.currentValue}
                </span>
              </a>
            ) : (
              <p className="noUrl">{localeTexts.CustomField.modal.noUrlText}</p>
            )}
          </div>
        ))}
      </ModalBody>
      <ModalFooter>
        <ButtonGroup>
          <Button onClick={props.closeModal} buttonType="delete">
            {localeTexts.CustomField.modal.cancelBtnText}
          </Button>
        </ButtonGroup>
      </ModalFooter>
    </>
  );
}

export default SelectModal;
