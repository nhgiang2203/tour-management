import { Request, Response } from 'express';
import Tour from '../../models/tour.model';

//[GET]/cart/
export const index = (req: Request, res: Response) => {
  res.render('client/pages/cart/index', {
    pageTitle: "Trang giỏ hàng"
  })
}

//[POST]/cart/list-json
export const listJson = async (req: Request, res: Response) => {
  const tours = req.body;
  for (const tour of tours) {
    const infoTour = await Tour.findOne({
      where: {
        id: tour.tourId,
        deleted: false,
        status: 'active'
      },
      raw: true
    });

    tour["info"] = infoTour;
    tour["image"] = JSON.parse(infoTour["images"])[0];
    tour["price_special"] = infoTour["price"] * (1 - infoTour["discount"]/100);
    tour["total"] = tour["quantity"] * tour["price_special"];
  }

  res.json({
    tours: tours
  });
}