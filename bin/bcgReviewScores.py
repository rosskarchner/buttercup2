from random import randint
import sys

from splunklib.searchcommands import dispatch, StreamingCommand, Configuration


# for lab brevity, just return a random number from 1 to 5!
def getAvgReviewScore(productId):
 return str(randint(1,5))


@Configuration()
class GetReviewScoresCommand(StreamingCommand):
  def stream(self,events):
    for event in events:
      productId = event["productId"]
      event['review'] = getAvgReviewScore(productId)
      yield event

if __name__ == "__main__":
  dispatch(GetReviewScoresCommand, sys.argv, sys.stdin, sys.stdout, __name__)
