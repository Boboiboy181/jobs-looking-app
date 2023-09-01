import { useLocalSearchParams } from 'expo-router';
import { Text } from 'react-native';

const JobDetails = () => {
  const { id } = useLocalSearchParams();

  return <Text>Hello {id}</Text>;
};

export default JobDetails;
