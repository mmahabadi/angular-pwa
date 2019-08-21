import { Component, OnInit, OnDestroy } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Coffee } from '../logic/coffee';
import { GeolocationService } from '../geolocation.service';
import { TastingRating } from '../logic/tastingRating';
import {DataService} from '../data.service';

@Component({
  selector: 'app-coffee',
  templateUrl: './coffee.component.html',
  styleUrls: ['./coffee.component.scss']
})
export class CoffeeComponent implements OnInit, OnDestroy {
  routingSubscription: any;
  coffee: Coffee;
  tastingEnabled: boolean;
  types = ['Espresso', 'Ristretto', 'Americano', 'Cappuccino', 'Frappe'];

  constructor(private _route: ActivatedRoute,
              private _router: Router,
              private _data: DataService,
              private _geolocationService: GeolocationService) { }

  ngOnInit() {
    this.coffee = new Coffee();
    this.routingSubscription = this._route.params.subscribe( params => {
      if (params['id']) {
        this._data.get(params['id'], res => {
          this.coffee = res;
          if (this.coffee.tastingRating && this.coffee.tastingRating.aroma) {
            this.tastingEnabled = true;
          }
        });
      }
    });

    this._geolocationService.requestLocation( location => {
      console.log(location);
      if (location) {
        this.coffee.location.latitude = location.latitude;
        this.coffee.location.longitude = location.longitude;
      }
    });
  }

  tastingRatingChanged(checked: boolean) {
    if (checked) {
      this.coffee.tastingRating = new TastingRating();
    } else {
      this.coffee.tastingRating = null;
    }
  }

  cancel() {
    this._router.navigate(['/']);
  }

  save() {
    this._data.save(this.coffee, result => {
      if (result) {
        this._router.navigate(['/']);
      } else {

      }
    });
  }

  ngOnDestroy() {
    this.routingSubscription.unsubscribe();
  }
}
