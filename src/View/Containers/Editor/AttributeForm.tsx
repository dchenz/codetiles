import React, { useContext, useEffect, useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { Check2Square, XLg } from "react-bootstrap-icons";
import { AttributeFormGroupProps, AttributeFormProps } from "../../../types";
import { EditorContext } from "../../Context/EditorContext";


export default function AttributeForm(props: AttributeFormProps): JSX.Element {
  const [tempValues, setTempValues] = useState<Record<string, string> | null>(null);
  const { editorCtx, setEditorCtx } = useContext(EditorContext);

  useEffect(() => {
    setTempValues(Object.fromEntries(
      props.tile.getAttributes().map((attr) => ([attr.id, attr.value]))
    ));
  }, [props.tile]);

  if (tempValues == null) {
    return <div />;
  }

  const hasChanges = () => {
    for (const attr of props.tile.getAttributes()) {
      if (attr.value != tempValues[attr.id]) {
        return true;
      }
    }
    return false;
  };

  const attributes = props.tile.getAttributes();
  return (
    <Form>
      {
        attributes.map((attr, k) =>
          <AttributeFormGroup
            key={k}
            attr={attr}
            commitValue={(v: string) => {
              tempValues[attr.id] = v;
              setTempValues(tempValues);
              editorCtx.hasChanges = hasChanges();
              setEditorCtx(editorCtx);
            }}
          />
        )
      }
      <div className="editor-controls">
        <button onClick={(e) => {
          e.preventDefault();
          // Set all values back to source
          for (const attr of props.tile.getAttributes()) {
            attr.value = tempValues[attr.id];
          }
          props.onSave();
        }}>
          <Check2Square size={24} />
        </button>
        <button onClick={(e) => {
          e.preventDefault();
          props.onCancel();
        }}>
          <XLg size={24} />
        </button>
      </div>
    </Form>
  );
}

function AttributeFormGroup({ attr, commitValue }: AttributeFormGroupProps): JSX.Element {
  const [error, setError] = useState<string | null>(null);
  const [value, setValue] = useState<string>("");

  useEffect(() => {
    setValue(attr.value);
  }, [attr]);

  return (
    <Form.Group className="my-2">
      {
        attr.displayName ?
          <Form.Label>{attr.displayName}</Form.Label>
          : null
      }
      <InputGroup hasValidation>
        <Form.Control
          type="text"
          value={value}
          onChange={(e) => {
            setError(null);
            setValue(e.target.value);
          }}
          onBlur={() => {
            commitValue(value);
            setError(attr.validate(value));
          }}
          isInvalid={error != null}
        />
        <Form.Control.Feedback type="invalid">
          {error}
        </Form.Control.Feedback>
      </InputGroup>
    </Form.Group>
  );
}