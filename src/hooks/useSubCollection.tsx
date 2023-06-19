import {
  DocumentData,
  Query,
  Timestamp,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { useAppSelector } from "../components/app/hooks";

interface Messages {
  timestamp: Timestamp;
  message: string;
  user: {
    uid: string;
    photo: string;
    email: string;
    displayName: string;
  };
}

const useSubCollection = (
  collectionName: string,
  subCollectionName: string
) => {
  const channelId = useAppSelector((state) => state.channel.channelId);
  const [subDocuments, setSubDocuments] = useState<Messages[]>([]);

  //クリックしたchannelのIDを依存配列にしてクリックしたチャンネルが変わるたびに発火
  useEffect(() => {
    //今クリックしているchannelのmessageの場所を設定する
    let collectionRef = collection(
      db,
      collectionName,
      String(channelId),
      subCollectionName
    );

    const collectionRefOrderBy = query(
      collectionRef,
      orderBy("timestamp", "desc")
    );
    //
    //今クリックしているchannelに入っているデータをひとつづつループで回してリザルトの配列に入れる
    //onSnapshotでリアルタイムで監視
    onSnapshot(collectionRefOrderBy, (snapshot) => {
      let results: Messages[] = [];
      snapshot.docs.forEach((doc) => {
        results.push({
          timestamp: doc.data().timestamp,
          message: doc.data().message,
          user: doc.data().user,
        });
      });
      setSubDocuments(results);
      console.log(results);
    });
  }, [channelId]);

  return { subDocuments };
};

export default useSubCollection;
