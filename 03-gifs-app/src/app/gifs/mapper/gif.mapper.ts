import type { GiphyItem } from "../interfaces/giphy.interfaces";
import type { Gif } from "../interfaces/git.interface";

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class GifMapper {

  static mapGiphyItemToGif(item: GiphyItem): Gif {
    return {
      id: item.id,
      title: item.title,
      url: item.images.original.url
    }
  }

  static mapGiphyItemsToGifArray(items: GiphyItem[]): Gif[] {
    // biome-ignore lint/complexity/noThisInStatic: <explanation>
    return items.map(this.mapGiphyItemToGif)

  }
}
