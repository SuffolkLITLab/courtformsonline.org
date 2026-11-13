import React from 'react';
import {render,screen,fireEvent,waitFor} from '@testing-library/react';
import '@testing-library/jest-dom';
import AskLitInstructorNotes from '../src/app/components/AskLitInstructorNotes';

test('fetches instructor notes only with password POST, escapes text, and clears notes',async()=>{
  const fetchMock=jest.fn().mockResolvedValue({ok:true,json:async()=>({notes:'Private <script>example</script>'})});global.fetch=fetchMock;
  render(<AskLitInstructorNotes botId={'a'.repeat(32)} apiBase="https://api.example" />);
  expect(fetchMock).not.toHaveBeenCalled();
  fireEvent.click(screen.getByText('Instructor notes'));
  fireEvent.change(screen.getByLabelText('Instructor password'),{target:{value:'separate-instructor-password'}});
  fireEvent.click(screen.getByRole('button',{name:'Read instructor notes'}));
  expect(await screen.findByText('Private <script>example</script>')).toBeInTheDocument();
  expect(document.querySelector('script')).toBeNull();
  expect(fetchMock).toHaveBeenCalledWith(expect.stringContaining('/instructor-notes'),expect.objectContaining({method:'POST',credentials:'omit',body:JSON.stringify({password:'separate-instructor-password'})}));
  fireEvent.click(screen.getByRole('button',{name:'Hide notes'}));
  expect(screen.queryByText('Private <script>example</script>')).not.toBeInTheDocument();
  expect(screen.getByLabelText('Instructor password')).toHaveValue('');
});
