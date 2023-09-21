import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, items, theme) {
  return {
    fontWeight:
      items.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelect(props) {
  const theme = useTheme();
  const [selectedItems, setItems] = React.useState([]);
  const [questionInput, setQuestionInput] = React.useState();

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    if (!selectedItems.includes(value[0])) {
      selectedItems.push(...value);
    }
  };

  function composePrompt(items, question) {
    let composedPrompt = question;
    for (const prompt in selectedItems) {
      if (items.find( i => {return i.name === prompt})) {
        composedPrompt += prompt
      }
    }
    return composedPrompt;
  }

  function onSubmit(event) {
    const input = composePrompt(props.items, props.question);

    event.preventDefault();
    console.log(`questionInput: ${input}`);
    console.log(props);
    axios.post('https://undndgmlrl.execute-api.us-east-1.amazonaws.com/dev/generate', input)
    .then(data => {
      props.setResult(data.data.choices[0].message.content);
    })
  }

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-name-label">{props.label}</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          name="promptSelect"
          multiple
          value={[]}
          onChange={handleChange}
          input={<OutlinedInput label="Prompts" />}
          MenuProps={MenuProps}
        >
          {props.items.map(item => (
            <MenuItem
              key={item.name}
              value={item.name}
              style={getStyles(item.name, selectedItems, theme)}
            >
              {item.name}
            </MenuItem>
          ))}
        </Select>
        <input type="submit" value="Create!" onClick={onSubmit}/>
      </FormControl>
    </div>
  );
}