from youtube_transcript_api import YouTubeTranscriptApi
import json 

ytt_api = YouTubeTranscriptApi()
transcript = ytt_api.fetch("3TKJDNcrBXQ")


with open("transcript.txt","w") as file:
    for snippet in transcript:
        file.write(snippet.text + "\n")