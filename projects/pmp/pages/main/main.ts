import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  ActivatedRoute,
  Event,
  NavigationStart,
  Router,
  RouterOutlet,
} from '@angular/router';
import { CategoriesService } from 'projects/pmp/shared/data-access/categories-service';
import { filter } from 'rxjs';

@Component({
  selector: 'pmp-main',
  templateUrl: './main.html',
  styleUrl: './main.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet],
})
export class Main {
  private router = inject(Router);
  private categoriesService = inject(CategoriesService);

  title = 'Praatje met plaatjes';

  selectedCategory = this.categoriesService.selectedCategory;

  private previousNavId?: number;

  constructor() {
    this.router.events
      .pipe(
        // The "events" stream contains all the navigation events. For this demo,
        // though, we only care about the NavigationStart event as it contains
        // information about what initiated the navigation sequence.
        filter((event: Event) => {
          return event instanceof NavigationStart;
        })
      )
      .subscribe((event: NavigationStart) => {
        if (
          event.restoredState // navigation was triggered by back/forward
        ) {
          const navId = event.restoredState.navigationId;
          console.log(
            `previous nav: ${this.previousNavId} | current nav: ${navId}`
          );
          if (this.previousNavId !== undefined) {
            if (navId < this.previousNavId) {
              console.log('Back navigation');
            } else if (navId > this.previousNavId) {
              console.log('Forward navigation');
            }
          }
          this.previousNavId = navId;
        }
      });

    // React to route parameter changes
    // this.router.events
    //   .pipe(
    //     // The "events" stream contains all the navigation events. For this demo,
    //     // though, we only care about the NavigationStart event as it contains
    //     // information about what initiated the navigation sequence.
    //     filter((event: Event) => {
    //       return event instanceof NavigationStart;
    //     })
    //   )
    //   .subscribe((event: NavigationStart) => {
    //     debugger;
    //     console.group('NavigationStart Event');
    //     // Every navigation sequence is given a unique ID. Even "popstate"
    //     // navigations are really just "roll forward" navigations that get
    //     // a new, unique ID.
    //     console.log('navigation id:', event.id);
    //     console.log('route:', event.url);
    //     // The "navigationTrigger" will be one of:
    //     // --
    //     // - imperative (ie, user clicked a link).
    //     // - popstate (ie, browser controlled change such as Back button).
    //     // - hashchange
    //     // --
    //     // NOTE: I am not sure what triggers the "hashchange" type.
    //     console.log('trigger:', event.navigationTrigger);

    //     // This "restoredState" property is defined when the navigation
    //     // event is triggered by a "popstate" event (ex, back / forward
    //     // buttons). It will contain the ID of the earlier navigation event
    //     // to which the browser is returning.
    //     // --
    //     // CAUTION: This ID may not be part of the current page rendering.
    //     // This value is pulled out of the browser; and, may exist across
    //     // page refreshes.
    //     if (event.restoredState) {
    //       console.warn(
    //         'restoring navigation id:',
    //         event.restoredState.navigationId
    //       );
    //     }

    //     console.groupEnd();
    //   });
  }
}
