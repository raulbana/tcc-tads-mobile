import {useState} from 'react';

const useComment = () => {
  const [repliesVisible, setRepliesVisible] = useState(false);

  const toggleReplies = () => {
    setRepliesVisible(!repliesVisible);
  };
  return {repliesVisible, toggleReplies};
};

export default useComment;
