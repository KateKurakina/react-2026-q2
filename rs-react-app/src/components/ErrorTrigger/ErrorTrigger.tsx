type Props = {
  shouldCrash: boolean;
};

export default function ErrorTrigger({ shouldCrash }:Props) {
  if (shouldCrash) {
    throw new Error("Test error");
  }

  return null;
}
